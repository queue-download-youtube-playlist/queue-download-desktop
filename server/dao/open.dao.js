const {exec} = require('child_process');
const {daoFile} = require('./file.dao.js');

function execCmdRun(cmd, callback) {
  let coffeeProcess = exec(cmd);
  coffeeProcess.stdout.on('data', (data) => {
    console.log(data);
  });
  coffeeProcess.on('close', () => {
    console.log(`${cmd} close! ... `);
    if (callback) {
      callback();
    }
  });
}

async function openVideo(message) {
  let {vid} = message;
  let s = await daoFile.getVideoPath({vid});
  let cmd = `start "" "${s}" `;
  execCmdRun(cmd);
}

const daoOpen = {
  openVideo: openVideo,
};

module.exports = {
  daoOpen: daoOpen,
};