const wrapper = function(passdata) {
  const express = require('express');
  const noticeRouter = express.Router();
  const {daoNotice} = require('../dao/notice.dao');

  noticeRouter.post('/mp4', async (req, res) => {
    res.status(200).send();
    await daoNotice.notice_browser_mp4(req.body, passdata);
  });
  noticeRouter.post('/playlist/', async (req, res) => {
    res.status(200).send();
    daoNotice.notice_browser_playlist(req.body, passdata);
  });

  noticeRouter.get('/fetchallauthor', async (req, res) => {
    res.status(200).send();
    daoNotice.notice_deskapp_fetch_all_author(passdata);
  });

  return noticeRouter;
};

module.exports = wrapper;
