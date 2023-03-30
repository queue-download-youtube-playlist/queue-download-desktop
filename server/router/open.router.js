const wrapper = function(passdata) {
  const express = require('express');
  const openRouter = express.Router();
  const {daoOpen} = require('../dao/open.dao');

  openRouter.get('/:vid', async (req, res) => {
    res.status(200).send();
    await daoOpen.openVideo(req.params, passdata);
  });

  return openRouter;
};

module.exports = wrapper;
