const {daoNotice} = require('./notice.dao');
const {table} = require('../db/util.typeorm.js');

async function taskPost(message, passdata) {
  let {datamap, queue, uuid} = message;
  if (queue) {
    let {playlist} = queue;

    for (let index in datamap) { // index --> vid
      let vid = datamap[index];

      const findOne = await table.taskFindOneWhere({index, playlist});
      let task = {vid, index, playlist};

      if (findOne == null) {
        await table.taskSave(task);
      } else {
        console.log(`repeat!!!`, task);
      }

    }

    // **************************************************
    let keys = Object.keys(datamap);
    let total = keys.length;
    if (total !== 0) {
      queue['total'] = total;
      let options = {
        where: {
          playlist,
        },
      };
      try {
        await table.queueUpdate(queue, {playlist});
        // console.log(`queueUpdate ok`);
      } catch (e) {

      } finally {
        let queue = {
          playlist,
          total,
        };
        daoNotice.noticedesktopQueueUpdate({
          queue,
        }, passdata);
      }

    }

  } else {
    // console.log(`taskPost queue is null ....... ${queue}`);
  }
  return null;
}

async function taskUpdateFinishedTrue(message, passdata) {
  if (message.hasOwnProperty('task')) {
    const {task} = message;
    let {index, playlist} = task;
    task['finished'] = true;

    await table.taskUpdate(task, {
      index, playlist,
    });
  } else {
    console.log(`common_task.js taskUpdateFinishedTrue no task Object !!!`);
  }
}

async function taskGetAll(message, passdata, callback) {
  // let options = {attributes: ['vid', 'index', 'playlist'],};
  return await table.taskFind();
}

const daoTask = {
  taskPost: taskPost,
  taskUpdateFinishedTrue: taskUpdateFinishedTrue,

  taskGetAll: taskGetAll,
};
module.exports = {
  daoTask: daoTask,
};