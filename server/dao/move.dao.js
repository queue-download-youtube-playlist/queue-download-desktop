const {daoFile} = require('./file.dao.js');

async function moveJPG(message) {
  let {vid, uuid} = message;
  if (vid) {
    let message = {
      vid,
      uuid,
    };
    await daoFile.moveJPG(message);
  }
}

const daoMove = {
  moveJPG: moveJPG,
};

module.exports = {
  daoMove: daoMove,
};