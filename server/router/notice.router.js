const wrapper = function(passdata) {
  const express = require('express');
  const noticeRouter = express.Router();
  const {daoNotice} = require('../dao/notice.dao');

  noticeRouter.post('/mp4', async (req, res) => {
    res.status(200).send();
    await daoNotice.noticebrowserMP4(req.body, passdata);
  });
  noticeRouter.post('/playlist/', (req, res) => {
    res.status(200).send();
    daoNotice.noticebrowserPlaylist(req.body, passdata);
  });

  return noticeRouter;
};

module.exports = wrapper;
