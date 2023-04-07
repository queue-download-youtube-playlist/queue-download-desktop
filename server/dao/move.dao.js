const {daoFile} = require('./file.dao.js');
const {daoNotice} = require('./notice.dao');

async function moveJPG(message, passdata) {
  let {vid, uuid} = message;
  if (vid) {
    let message = {
      vid,
      uuid,
    };
    await daoFile.moveJPG(message);
    // daoNotice.notice_browser_firefox_notice({
    //   title: 'image download ok',
    //   text: '',
    // }, passdata);

  }
}

const daoMove = {
  moveJPG: moveJPG,
};

module.exports = {
  daoMove: daoMove,
};