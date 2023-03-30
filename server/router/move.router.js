const wrapper = function(passdata) {
  const express = require('express');
  const moveRouter = express.Router();
  const {daoMove} = require('../dao/move.dao');

  moveRouter.post('/jpg/', async (req, res) => {
    res.status(200).send();
    let message = req.body;
    await daoMove.moveJPG(message, passdata);
  });

  return moveRouter;
};

module.exports = wrapper;
