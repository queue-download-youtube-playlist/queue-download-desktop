const {execSync} = require('child_process');
const {daoFile} = require('./file.dao.js');

async function openVideo(message) {
  let {vid} = message;
  let {pathmp4} = await daoFile.checkNewPathMP4({vid});
  let cmd = `start "" "${pathmp4}" `;
  execSync(cmd);
}

const daoOpen = {
  openVideo: openVideo,
};

module.exports = {
  daoOpen: daoOpen,
};