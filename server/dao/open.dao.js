const {execSync} = require('child_process');
const {daoFile} = require('./file.dao.js');
const {daoNotice} = require('./notice.dao');

async function openVideo(message, passdata) {
  console.log('openVideo')
  console.log('meslog ', `message=\n`, message);

  let {vid} = message;
  let {pathmp4, exists} = await daoFile.checkNewPathMP4({vid});
  if (exists) {
    let cmd = `start "" "${pathmp4}" `;
    try {
      daoNotice.notice_browser_firefox_notice({
        title: 'open file success',
        text: '',
      }, passdata);
      execSync(cmd);
    } catch (e) {
      console.log(e);
      daoNotice.notice_browser_firefox_notice({
        title: 'open failed!',
        text: 'file is used by another process',
      }, passdata);
    }
  }else {
    daoNotice.notice_browser_firefox_notice({
      title: 'not exists! click redownload button',
      text: pathmp4,
    }, passdata);
  }

}

const daoOpen = {
  openVideo: openVideo,
};

module.exports = {
  daoOpen: daoOpen,
};