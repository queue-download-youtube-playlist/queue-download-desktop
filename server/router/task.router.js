const {queueUpdateTotal} = require('../dao/queue.dao');
const {taskPost, taskFindAll} = require('../dao/task.dao');
const wrapper = function(passdata) {
  const express = require('express');
  const taskRouter = express.Router();

  /**
   * create a lot of task by playlist
   */
  taskRouter.post('/', async (req, res) => {
    res.status(200).send();
    await taskPost(req.body, passdata);
    await queueUpdateTotal(req.body, passdata);
  });

  taskRouter.get('/all', (req, res) => {
    taskFindAll(req.params, passdata).then((value) => {
      res.status(200).send(value);
    });
  });

  return taskRouter;
};

module.exports = wrapper;
