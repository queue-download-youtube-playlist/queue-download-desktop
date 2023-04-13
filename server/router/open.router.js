const {openExtensionPage, openVideo} = require('../dao/open.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const openRouter = express.Router();

  openRouter.get('/localvideo/:vid',  (req, res) => {
    res.status(200).send();
     openVideo(req.params, passdata);
  });

  openRouter.get('/browserpage/extension',  (req, res) => {
    res.status(200).send();
     openExtensionPage();
  });
  return openRouter;
};

module.exports = wrapper;
