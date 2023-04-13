const fs = require('fs');
const {table} = require('../db/util.typeorm');

const {comVideoGet, comVideoUpdateDownloading, comVideoUpdateExists}
  = require('./_common.dao');

async function taskFindAllFinishedTrueLength(message) {
  let {playlist} = message;
  let tasks = await table.taskFindWhere({playlist, finished: true});
  return tasks.length;
}

module.exports = {
  taskPost: async (message) => {
    let {datamap, playlist} = message;
    for (let index in datamap) { // index --> vid
      let vid = datamap[index];
      try {
        const findOne = await table.taskFindOneWhere(
          {vid, index, playlist});
        let tid = `${vid} ${index}`;
        let task = {tid, vid, index, playlist};
        if (findOne) {
        }else {
          await table.taskInsert(task);
        }
      } catch (e) {
        console.log('meslog ', `e=\n`, e);
      }
    }
  },

  taskDelete:
    /**
     *
     * @param message{Object:{playlist:String}}
     * @return {Promise<void>}
     */
    async (message) => {
      let {playlist} = message;
      await table.taskDelete({playlist});
    },

  taskUpdate: /**
   *
   * @param message{Object:{vid:String}}
   * @return {Promise<boolean>}
   */
  async (message) => {
    let {vid} = message;
    let {filepath} = await comVideoGet({vid});
    let finished = fs.existsSync(filepath);
    await table.taskUpdate({finished}, {vid});
    return finished;
  },

  taskFindAll: async () => {
    // let options = {attributes: ['vid', 'index', 'playlist'],};
    return await table.taskFind(null);
  },

  /**
   *
   * @param message{{playlist:String}}
   * @return {Promise<number>}
   */
  taskFindAllFinishedTrue: async (message) => {
    let {playlist} = message;
    let tasks = await table.taskFindWhere({playlist, finished: true});
    for (const value of tasks) {
      let {vid} = value;
      let video = await comVideoGet({vid});
      if (video) {
        let {exists} = await comVideoUpdateExists({vid});
        await table.taskUpdate({finished: exists}, {vid});
      } else {
        await table.taskUpdate({finished: false}, {vid});
      }
    }

    return (await taskFindAllFinishedTrueLength(message)).valueOf();
  },
  /**
   *
   * @param message{Object:{playlist:String}}
   * @return {Promise<{tid: "string", vid: "string", index: "string", playlist: "string", finished: "number"}>}
   */
  taskFindOneFalse: async (message) => {
    let {playlist} = message;
    let object = await table
      .taskFindOneWhere({playlist, finished: false});
    return object;
  },

};