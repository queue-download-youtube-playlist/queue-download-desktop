const {daoQueue} = require('../dao/queue.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const taskRouter = express.Router();
  const {daoTask} = require('../dao/task.dao');

  /**
   * create a lot of task by playlist
   */
  taskRouter.post('/', async (req, res) => {
    res.status(200).send();
    await daoTask.taskPost(req.body, passdata);
    await daoQueue.queueUpdateTotal(req.body, passdata)
  });

  taskRouter.get('/all', async (req, res) => {
    const value = await daoTask.taskGetAll(req.params, passdata);
    res.status(200).send(value);
  });

  return taskRouter;
};

module.exports = wrapper;
