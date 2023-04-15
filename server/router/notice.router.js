const {
  notice_deskapp_fetch_all_author, notice_browser_playlist,
} = require('../dao/notice.dao');
const {comNoticeMp4Check} = require('../dao/_common.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const noticeRouter = express.Router();

  noticeRouter.post('/mp4',  async (req, res) => {
    await comNoticeMp4Check(req.body, passdata);
    res.status(200).send();
  });
  noticeRouter.post('/playlist/',  (req, res) => {
    res.status(200).send();
     notice_browser_playlist(req.body, passdata);
  });

  noticeRouter.get('/fetchallauthor',  (req, res) => {
    res.status(200).send();
     notice_deskapp_fetch_all_author(passdata);
  });

  return noticeRouter;
};

module.exports = wrapper;