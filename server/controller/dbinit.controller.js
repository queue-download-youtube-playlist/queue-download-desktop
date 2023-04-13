const {configInit} = require('../dao/config.dao');
const {videoSetAllDownloadingFalse, videoSetAllSearchingFalse}
  = require('../dao/video.dao');
const {queueUpdateAllTask} = require('../dao/queue.dao');
const {dbInitValue} = require('../db/datasource');

module.exports = {
  dbInitFnController: async () => {
    await dbInitValue(async () => {
      await configInit();
      await videoSetAllDownloadingFalse();
      await videoSetAllSearchingFalse();
      await queueUpdateAllTask();
    });
  },
};