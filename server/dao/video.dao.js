const {daoDownload} = require('./down.dao');
const {daoNotice} = require('./notice.dao');
const {table} = require('../db/util.typeorm.js');
const {daoFile} = require('./file.dao.js');

async function videoPost(message, passdata) {
  let {video} = message;
  let {vid, author, title} = video;

  const prefixWatch = 'https://www.youtube.com/watch?v=';
  let vlink = `${prefixWatch}${vid}`;
  video['vlink'] = vlink;

  // custom rule --> title
  video['description'] = `${vlink}\n${author}\n`;

  let reg = /[<>:"/\\|?*]/g;
  video['filename'] = title.replace(reg, ' ');

  let findObj = await table.videoFindOneWhere({vid});
  if (findObj) { // find one update it
    // daoNotice.notice_browser_firefox_notice({
    //   title: `update exists video data`,
    //   text: null,
    // }, passdata);

  } else {
    // no found, create it
    await table.videoInsert(video);
    daoNotice.notice_browser_firefox_notice({
      title: `new video data`,
      text: `${title}`,
    }, passdata);

    daoNotice.notice_deskapp_fetch_author_video({author}, passdata);
  }

}

async function _videodelete(vid) {
  try {
    await table.videoDelete({vid});
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * {"vid":"aYc7qtvL-VA","withfile":true}
 * @param message
 * @param passdata
 */
async function videoDelete(message, passdata) {
  let {vid, withfile} = message;
  try {
    if (withfile) {
      await daoFile.deleteDownloadedMP4JPG({vid});
      await _videodelete(vid);
    } else {
      await _videodelete(vid);
    }
  } catch (e) {

  } finally {
    daoNotice.notice_browser_firefox_notice({
      title: 'delete success',
      text: '',
    }, passdata);

  }
}

async function videoPut(message, passdata) {

  let {video, playlist} = message;
  let {vid, downlink} = video;

  let findOne = await table.videoFindOneWhere({vid});
  if (findOne) {
    const findOneVideo = await table.videoUpdate(video, {vid});

    if (downlink) {
      let messageDownloadMP4 = {
        playlist,
        'video': findOneVideo,
      };
      await daoDownload.gotodownloadMP4(messageDownloadMP4, passdata);
    }

  } else {

  }
}

// let attributes = ['vid', 'author', 'title', 'quality', 'description', 'vlink'];

/**
 *
 * @param vid {String}
 * @returns {Promise<*>}
 */
async function videoCheck(vid) {
  let findOne = await table.videoFindOneWhere({vid});
  console.log(`findOne=\n`, findOne, `\n`);

  if (findOne === null) {
    return false;
  } else {
    let {exists} = await daoFile.checkNewPathMP4({vid});
    return exists;
  }
}

async function videoGetAll() {
  // console.log(`video.dao.js videoGetAll`);
  let findAll = await table.videoFind(null);
  let columnName = 'vid';
  return findAll.reduce(function(map, obj) {
    let key = obj[columnName];
    map[key] = obj;
    return map;
  }, {});
}

async function videoGetAllByLikeTitle(message) {
  let {title} = message;
  console.log(`videoGetAllByLikeTitle title=${title}`);

  let findAll = await table.videoFindWhereLike({title});
  let columnName = 'vid';
  return findAll.reduce(function(map, obj) {
    let key = obj[columnName];
    map[key] = obj;
    return map;
  }, {});
}

async function videoGetByVid(message) {
  let {vid} = message;
  return await table.videoFindOneWhere({vid});
}

async function videoGetAllAuthor() {
  const values = await table.videoFind(null);
  let columnName = 'author';
  return Array.from(values).reduce((map, value) => {
    const author = value[columnName];
    map[author] = author;
    return map;
  }, {});
}

async function videoGetAllByAuthor(message) {
  let {author} = message;
  const values = await table.videoFindWhere({author});
  let columnName = 'vid';
  return Array.from(values).reduce((map, obj) => {
    let key = obj[columnName];
    map[key] = obj;
    return map;
  }, {});
}

const daoVideo = {
  videoPost: videoPost,
  videoDelete: videoDelete,
  videoPut: videoPut,

  videoCheck: videoCheck,
  videoGetAll: videoGetAll,
  videoGetAllByLikeTitle: videoGetAllByLikeTitle,

  videoGetByVid: videoGetByVid,
  videoGetAllAuthor: videoGetAllAuthor,
  videoGetAllByAuthor: videoGetAllByAuthor,
};

module.exports = {
  daoVideo: daoVideo,
};