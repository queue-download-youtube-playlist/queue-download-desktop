const {table} = require('../db/util.typeorm.js');

async function taskPost(message) {
  let {datamap, playlist} = message;

  for (let index in datamap) { // index --> vid
    let vid = datamap[index];
    const findOne = await table.taskFindOneWhere({index, playlist});
    let task = {vid, index, playlist};
    if (findOne == null) {
      await table.taskInsert(task);
    }
  }
}

async function taskGetAll() {
  // let options = {attributes: ['vid', 'index', 'playlist'],};
  return await table.taskFind(null);
}

const daoTask = {
  taskPost: taskPost,

  taskGetAll: taskGetAll,
};
module.exports = {
  daoTask: daoTask,
};