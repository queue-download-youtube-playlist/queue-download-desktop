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
  video['description'] = `${vlink}\n${author}\n${title}\n`;

  let reg = /[<>:"/\\|?*]/g;
  video['filename'] = title.replace(reg, ' ');

  let findObj = await table.videoFindOneWhere({vid});
  if (findObj) { // find one update it
    // comnotice.noticebrowserSendMessageToNotice({
    //   text: `video id exists ${title}`,
    // }, passdata);

  } else {
    // no found, create it
    await table.videoSave(video);
    // comnotice.noticebrowserSendMessageToNotice({
    //   text: `create new video ${title}`,
    // }, passdata);
    // console.log(`video.dao.js videoPost create`);
  }

}

async function _videodelete(vid) {
  try {
    await table.videoDelete({vid});
  } catch (e) {

  }
}

/**
 * {"vid":"aYc7qtvL-VA","withfile":true}
 * @param message
 * @param passdata
 */
async function videoDelete(message, passdata) {
  let {vid, withfile} = message;
  if (withfile) {
    let result = await daoFile.deleteDownloadedMP4JPG({vid});
    if (result) {
    }
    await _videodelete(vid);
    // comnotice.noticebrowserSendMessageToNotice({
    //   text: `delete ok`,
    // }, passdata);
  } else {
    await _videodelete(vid);
    // comnotice.noticebrowserSendMessageToNotice({
    //   text: `delete ok`,
    // }, passdata);
  }
}

async function videoPut(message, passdata) {

  let {video, queue} = message;
  let {vid, downlink} = video;

  let findOne = await table.videoFindOneWhere({vid});
  if (findOne) {
    const findOneVideo = await table.videoUpdate(video, {vid});

    if (downlink) {
      let messageDownloadMP4 = {
        queue,
        'video': findOneVideo,
      };
      await daoDownload.gotodownloadMP4(messageDownloadMP4, passdata);
    }

  } else {

  }
}

// let attributes = ['vid', 'author', 'title', 'quality', 'description', 'vlink'];

async function videoGetAll() {
  // console.log(`video.dao.js videoGetAll`);
  let findAll = await table.videoFind();
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
  const values = await table.videoFind();
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
  videoGetAll: videoGetAll,
  videoGetAllByLikeTitle: videoGetAllByLikeTitle,

  videoGetByVid: videoGetByVid,
  videoGetAllAuthor: videoGetAllAuthor,
  videoGetAllByAuthor: videoGetAllByAuthor,
};

module.exports = {
  daoVideo: daoVideo,
};