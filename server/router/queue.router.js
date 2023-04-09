const {daoQueue} = require('../dao/queue.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const queueRouter = express.Router();
  const {daoQueue} = require('../dao/queue.dao');

  queueRouter.post('/', async (req, res) => {
    res.status(200).send();
    await daoQueue.queuePost(req.body, passdata);
  });

  queueRouter.post('/download', async (req, res) => {
    res.status(200).send();
    await daoQueue.queueDownloadOne(req.body, passdata);
  });

  queueRouter.delete('/', async (req, res) => {
    res.status(200).send();
    await daoQueue.queueDelete(req.body, passdata);
  });

  queueRouter.get('/all', async (req, res) => {
    let values = await daoQueue.queueGetAll();
    res.status(200).send(values);
  });

  queueRouter.get('/check/:playlist', async (req, res) => {
    let {playlist} = req.params
    let values = await daoQueue.queueCheck({playlist});
    res.status(200).send(values);
  });

  return queueRouter;
};

module.exports = wrapper;