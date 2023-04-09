const wrapper = function(passdata) {
  const express = require('express');
  const openRouter = express.Router();
  const {daoOpen} = require('../dao/open.dao');

  openRouter.get('/localvideo/:vid', async (req, res) => {
    res.status(200).send();
    await daoOpen.openVideo(req.params, passdata);
  });

  openRouter.get('/browserpage/extension', async (req, res) => {
    res.status(200).send();
    await daoOpen.openExtensionPage();
  });
  return openRouter;
};

module.exports = wrapper;
