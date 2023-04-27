const fs = require('fs');

const {table} = require('../db/util.typeorm');
const {comVideoGet, comVideoUpdateExists, comNoticeMp4Check,
  comVideoUpdateSearchingFalse
} = require('./_common.dao');

const {notice_deskapp_show_the_video,
} = require('./notice.dao');
const {configGetFilepathSavelocation} = require('./config.dao');
const {queueUpdateAllTask} = require('./queue.dao');
const {Like} = require('typeorm');

async function _videodelete(vid) {
  try {
    await table.videoDelete({vid});
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *
 * @return {Promise<boolean>}
 * @param message{Object:{vid:String}}
 */
async function videoDeleteDownloadedMP4(message) {
  let {vid} = message;
  try {
    let {filepath} = await comVideoGet({vid});
    if (fs.existsSync(filepath)) {
      fs.rmSync(filepath, {force: true, recursive: true});
    }
    await comVideoUpdateExists({vid})

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * type1 video data,
 *
 * type2 video file
 *
 * type3 video data and file
 *
 * @param message{Object:{vid:String,type?:number}}
 * @param passdata
 * @return {Promise<void>}
 */
async function videoDelete(
  message,
  passdata) {

  let {vid, type} = message;
  try {
    switch (type) {
      case 1:
        await _videodelete(vid);
        break;
      case 2:
        await videoDeleteDownloadedMP4({vid});
        break;
      case 3:
        await videoDeleteDownloadedMP4({vid});
        await _videodelete(vid);
        break;
    }

  } catch (e) {
    console.log('meslog ', `e=\n`, e);
  } finally {
    // todo update task
    await queueUpdateAllTask();

    // await notice_browser_firefox_notice({
    //   title: 'delete success',
    //   text: `vid=${vid}`,
    // }, passdata);
  }
}

// let attributes = ['vid', 'author', 'title', 'quality', 'description', 'vlink'];

//******************************************************************************
/**
 *
 * @param message{Object:{video:String}}
 * @param passdata
 */
async function videoPost(message, passdata) {
  console.log(`meslog videoPost message=\n`, message);

  let {video} = message;
  let {vid, author, title} = video;

  const prefixWatch = 'https://www.youtube.com/watch?v=';
  let vlink = `${prefixWatch}${vid}`;
  let description = `${vlink}\n${author}\n`;
  let reg = /[<>:"/\\|?*]/g;
  let endsMP4 = `.mp4`;
  let filename = String(title.replace(reg, ' ')).concat(endsMP4);
  let filepath = await configGetFilepathSavelocation(
    filename);

  let exists = fs.existsSync(filepath);
  let downloading = false;
  let searching = false;

  let videoNew = {
    ...video,
    vlink,
    description,
    filename,
    filepath,

    exists,
    downloading,
    searching,
  };
  // console.log('meslog ', `videoNew=\n`, videoNew);

  let findObj = await comVideoGet({vid});
  if (findObj) { // find one update it
    // todo update
    await table.videoUpdate(videoNew, {vid});

    // notice_browser_firefox_notice({
    //   title: `update exists video data`,
    //   text: null,
    // }, passdata);
  } else {
    // todo insert
    await table.videoInsert(videoNew);
    // await notice_browser_firefox_notice({
    //   title: `new video data`,
    //   text: `${title}`,
    // }, passdata);

    // notice_deskapp_show_the_video({vid, video: videoNew}, passdata);
  }

}

async function videoSetAllSearchingFalse() {
  await table.videoUpdate({searching: false});
}

async function videoCheckBoolean(message, passdata){
  let {vid} = message;
  try {
    let video = await comVideoGet({vid});
    if (video) {
      notice_deskapp_show_the_video({vid, video}, passdata);

      let {exists} = video;
      // todo return
      return exists;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
}
/**
 *
 * @param message{Object:{vid:String}}
 * @param passdata
 */
async function videoRedownload(message, passdata) {
  let {vid} = message;

  // todo delete old mp4 file
  await videoDelete({vid, type: 2}, passdata);
  // todo update searching to false
 await comVideoUpdateSearchingFalse({vid})

  // todo notice browser search video data
  await comNoticeMp4Check({
    vid, playlist: null,
  }, passdata);
}

// ***************************
module.exports = {
  videoPost:
  videoPost,
  videoDelete: videoDelete,

  videoPutDao: async (message) => {
    // console.log('video put');
    let {vid, video} = message;
    await table.videoUpdate(video, {vid});
  },

  videoRedownload:
  videoRedownload,

  videoCheckBoolean: videoCheckBoolean,

  videoGetAll: async () => {
    let findAll = await table.videoFind(null);
    let columnName = 'vid';
    return findAll.reduce(function(map, obj) {
      let key = obj[columnName];
      map[key] = obj;
      return map;
    }, {});
  },
  videoGetAllByLikeTitle: async (message) => {
    let {title} = message;
    console.log(`videoGetAllByLikeTitle title=${title}`);

    let findAll = await table.videoFind({
      where: {
        title: Like(`%${title}%`)
      }
    });
    let columnName = 'vid';
    return findAll.reduce(function(map, obj) {
      let key = obj[columnName];
      map[key] = obj;
      return map;
    }, {});
  },

  videoFindAllAuthor: async () => {
    const values = await table.videoFind(null);
    let columnName = 'author';
    return Array.from(values).reduce((map, value) => {
      const author = value[columnName];
      map[author] = author;
      return map;
    }, {});
  },
  videoFindAllByAuthor: async (message) => {
    let {author} = message;
    const values = await table.videoFind({
      where: {author}
    });
    let columnName = 'vid';
    values.forEach((value) => {
      let {vid} = value;
      comVideoUpdateExists({vid});
    });
    return Array.from(values).reduce((map, obj) => {
      let key = obj[columnName];
      map[key] = obj;
      return map;
    }, {});
  },

  //**************************
  /**
   *
   * @return {Promise<void>}
   */
  videoSetAllDownloadingFalse: async () => {
    await table.videoUpdate({downloading: false});
  },
  videoSetAllSearchingFalse:
  videoSetAllSearchingFalse,
};
