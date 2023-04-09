const {table} = require('../db/util.typeorm.js');
const fs = require('fs');
const path = require('path');

function saveDataToFile(datamap) {
  let file = path.join(__dirname, 'tmp.json');
  fs.writeFileSync(file, JSON.stringify(datamap));
}

async function taskPost(message) {
  let {datamap, playlist} = message;
  // saveDataToFile(datamap);

  for (let index in datamap) { // index --> vid
    let vid = datamap[index];
    try {
      const findOne = await table.taskFindOneWhere(
        {vid, index, playlist});

      let tid = `${vid} ${index}`
      let task = {tid, vid, index, playlist};
      if (findOne == null) {
        await table.taskInsert(task);
      }

    } catch (e) {
      console.log('meslog ', `e=\n`, e);
      console.log('meslog ', `vid=\n`, vid);
      console.log('meslog ', `index=\n`, index);
      console.log('meslog ', `playlist=\n`, playlist);

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