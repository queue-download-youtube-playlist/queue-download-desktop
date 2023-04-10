const {daoNotice} = require('./notice.dao');
const {table} = require('../db/util.typeorm.js');

function titleFilter(title) {
  let reg = /(.+)(?=- YouTube)/;
  let mat = title.match(reg);
  let first = mat[0];
  return first.trim();
}

async function queuePost(message, passdata) {
  let {queue} = message;
  let {playlist, title} = queue;
  queue['title'] = titleFilter(title);
  // console.log('playlist');
  // console.log(playlist);

  let where = {};
  let columnName = 'playlist';
  where[columnName] = playlist;
  let findOne = await table.queueFindOneWhere({playlist});
  if (findOne === null) {
    await table.queueInsert(queue);
    // daoNotice.notice_browser_firefox_notice({
    //   title: 'new playlist data',
    //   text: `${title}`,
    // }, passdata);
    daoNotice.notice_deskapp_queue_add({queue}, passdata);
    // todo notice firefox go get playlist all video id
    daoNotice.notice_browser_playlist({playlist}, passdata);
  } else {
    // daoNotice.notice_browser_firefox_notice({
    //   title: 'exists playlist',
    //   text: `${title}`,
    // }, passdata);
  }

}

async function queueDelete(message) {
  let {playlist} = message;
  let findKey = {playlist};
  let findOne = await table.queueFindOneWhere(findKey);
  if (findOne === null) {

  } else {
    await table.queueDelete(findKey);
    await table.taskDelete(findKey);
  }
}

/**
 *
 * @param message {Object:{playlist:String}}
 * @returns {Promise<number>}
 */
async function queueUpdateProgress(message) {
  let {playlist} = message;

  try {
    let searchObj = {'playlist': playlist, 'finished': true};
    let findManyTask = await table.taskFindWhere(searchObj);
    let progress = findManyTask.length;
    await table.queueUpdate({progress}, {playlist});

    return progress;
  } catch (e) {
    console.log(`e=`);
    console.log(e);
    let progress = 0;
    return progress;
  }
}

async function queueUpdateTotal(message, passdata) {
  let {
    playlist,
    total,
  } = message;

  await table.queueUpdate({playlist, total}, {playlist});
  daoNotice.notice_deskapp_queue_update({
    queue: {playlist, total},
  }, passdata);

}

async function queueGetAll() {
  // let options = {attributes: ['playlist', 'title', 'total', 'progress'],};
  let findAll = await table.queueFind(null);

  let columnName = 'playlist';
  return await findAll.reduce(function(map, val) {
    let key = val[columnName];
    map[key] = val;
    return map;
  }, {});
}

/**
 * download all video,
 *
 * find the playlist, get the top one video id, download it.
 *
 * @param message {Object:{playlist:String}}}
 * @param passdata
 */
async function queueDownloadOne(message, passdata) {
  let {playlist} = message;
  let findOne = await table.taskFindOneWhere({
    playlist, 'finished': false,
  });
  if (findOne) {
    let {vid} = findOne;
    daoNotice.notice_browser_mp4({vid, playlist}, passdata);

  } else {
    // console.log(`queueDownloadOne playlist progress 100% !!!`);
    // console.log(options);
    daoNotice.notice_browser_firefox_notice({
      title: 'dont need download!',
      text: 'playlist progress is 100%',
    }, passdata);
  }

}

/**
 *
 * @param message{Object:{playlist:String}}
 * @returns {Promise<boolean>}
 */
async function queueCheck(message) {
  console.log('queue check');
  console.log(`message=`);
  console.log(message);

  let {playlist} = message;
  let findOneWhere = await table.queueFindOneWhere({playlist});
  let exists = findOneWhere ? true : false;
  console.log(`exists=`);
  console.log(exists);
  return exists;
}

function queueAllTaskCheck() {

}

const daoQueue = {
  queuePost: queuePost,
  queueDelete: queueDelete,
  queueUpdateProgress: queueUpdateProgress,
  queueUpdateTotal: queueUpdateTotal,

  queueGetAll: queueGetAll,
  queueCheck: queueCheck,
  queueDownloadOne: queueDownloadOne,
};

module.exports = {
  daoQueue: daoQueue,
};