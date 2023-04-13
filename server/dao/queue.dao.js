const {table} = require('../db/util.typeorm');
const {taskFindAllFinishedTrue, taskFindOneFalse, taskDelete} = require(
  './task.dao');
const {
  comVideoGet, comVideoUpdateDownloading, comVideoUpdateExists,
  comNoticeMp4Check,
}
  = require('./_common.dao');

const {
  notice_browser_firefox_notice,
  notice_deskapp_queue_update,
  notice_browser_playlist,
  notice_deskapp_queue_add,
} = require('./notice.dao');

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
    // notice_browser_firefox_notice({
    //   title: 'new playlist data',
    //   text: `${title}`,
    // }, passdata);
    notice_deskapp_queue_add({queue}, passdata);
    // todo notice firefox go get playlist all video id
    notice_browser_playlist({playlist}, passdata);
  } else {
    // notice_browser_firefox_notice({
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
    await taskDelete(findKey);
  }
}

/**
 *
 * @param message {{playlist: String, progress: number}}
 * @returns {Promise<number>}
 */
async function queueUpdateProgress(message) {
  let {progress, playlist} = message;
  await table.queueUpdate({progress}, {playlist});
}

async function queueUpdateTotal(message, passdata) {
  let {
    playlist,
    total,
  } = message;

  await table.queueUpdate({playlist, total}, {playlist});
  notice_deskapp_queue_update({
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
  console.log(`queue download one`)
  let {playlist} = message;
  let findOne = await taskFindOneFalse({playlist});
  if (findOne) {
    let {vid} = findOne;
    await comNoticeMp4Check({vid, playlist}, passdata);

  } else {
    // console.log(`queueDownloadOne playlist progress 100% !!!`);
    // console.log(options);
    await notice_browser_firefox_notice({
      title: 'dont need download!',
      text: 'playlist progress is 100%',
      timeout: 240,
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

  let {playlist} = message;
  let findOneWhere = await table.queueFindOneWhere({playlist});
  return !!findOneWhere;
}

/**
 *
 * @return {Promise<void>}
 */
async function queueUpdateAllTask() {
  let arr = await table.queueFind(null);
  for (const value of arr) {
    let {playlist} = value;
    let progress = await taskFindAllFinishedTrue({playlist});
    await queueUpdateProgress({playlist, progress});
  }
}

module.exports = {
  queuePost: queuePost,
  queueDelete: queueDelete,
  queueUpdateProgress:
  queueUpdateProgress,

  queueUpdateTotal: queueUpdateTotal,

  queueGetAll: queueGetAll,
  queueCheck: queueCheck,
  queueDownloadOne: queueDownloadOne,

  // *********
  queueUpdateAllTask:
  queueUpdateAllTask,
};