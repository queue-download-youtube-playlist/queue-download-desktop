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
  // console.log('queue');
  // console.log(queue);

  let where = {};
  let columnName = 'playlist';
  where[columnName] = playlist;
  let findOne = await table.queueFindOneWhere({playlist});
  if (findOne === null) {
    await table.queueSave(queue);
    // comnotice.nb_notice({
    //   text: `create new queue ${title}`,
    // }, passdata);
    daoNotice.n_desk_QueueAdd(message, passdata);
    daoNotice.noticebrowserPlaylist(message, passdata);
  } else {
    // comnotice.nb_notice({
    //   text: `exists ${title}`,
    // }, passdata);
  }

}

async function queueDelete(message) {
  // console.log('queueDelete\n', message);
  let {queue} = message;
  let {playlist} = queue;
  let findKey = {playlist};
  let findOne = await table.queueFindOneWhere(findKey);
  if (findOne === null) {

  } else {
    await table.queueDelete(findKey);
    await table.taskDelete(findKey);
  }
}

/**
 * update the progress
 */
async function queueUpdateProgress(message) {
  let {queue} = message;
  let {playlist} = queue;

  let searchObj = {'playlist': playlist, 'finished': true};
  let tasks = await table.taskFindWhere(searchObj);
  let progress = tasks.length;
  if (progress >= 0) {
    let queue = {progress};
    await table.queueUpdate(queue, {playlist});
  }
  return progress;
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
 * desktop app ask to download a playlist,
 *  just download one.
 * @param message {Object:{queue:{playlist:String}}}
 * @param passdata
 */
async function queueDownloadOne(message, passdata) {

  if (message.hasOwnProperty('queue')) {
    let {queue} = message;
    let {playlist} = queue;

    let options = {
      where: {'playlist': playlist, 'finished': false},
    };

    let findOne = await table.taskFindOne(options);
    if (findOne) {
      let {vid, index, finished} = findOne;
      let message = {
        vid,
        queue: {
          index, playlist,
        },
      };
      await daoNotice.noticebrowserMP4(message, passdata);
    } else {
      // console.log(`queueDownloadOne playlist progress 100% !!!`);
      // console.log(options);
    }

  } else {
    // console.log('queue.dao.js queueDownloadOne no ' +
    //     '\nmessage=', message);
  }

}

const daoQueue = {
  queuePost: queuePost,
  queueDelete: queueDelete,
  queueUpdateProgress: queueUpdateProgress,

  queueGetAll: queueGetAll,
  queueDownloadOne: queueDownloadOne,
};

module.exports = {
  daoQueue: daoQueue,
};