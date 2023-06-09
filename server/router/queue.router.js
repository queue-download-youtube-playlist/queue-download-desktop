const {
  queueCheck,
  queueGetAll,
  queueDelete,
  queueDownloadOne,
  queuePost,
} = require('../dao/queue.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const queueRouter = express.Router();

  queueRouter.post('/', async (req, res) => {
    res.status(200).send();
    await queuePost(req.body, passdata);
  });

  queueRouter.get('/download/:playlist', async (req, res) => {
    await queueDownloadOne(req.params, passdata);
    res.status(200).send();
  });

  queueRouter.delete('/', async (req, res) => {
    res.status(200).send();
    await queueDelete(req.body, passdata);
  });

  queueRouter.get('/all', (req, res) => {
    queueGetAll().then((value) => {
      res.status(200).send(value);
    });
  });

  queueRouter.get('/check/:playlist', (req, res) => {
    queueCheck(req.params).then((value) => {
      res.status(200).send(value);
    });
  });

  return queueRouter;
};

module.exports = wrapper;