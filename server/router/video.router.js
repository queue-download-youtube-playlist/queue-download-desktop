const {videoPutController} = require('../controller/video.controller');
const {
  videoFindAllByAuthor,
  videoFindAllAuthor,
  videoGetAllByLikeTitle,
  videoGetAll,
  videoRedownload,
  videoCheckBoolean,
  videoDelete,
  videoPost,
} = require('../dao/video.dao');
const {comVideoGet}
  = require('../dao/_common.dao');

const wrapper = function(passdata) {
  const express = require('express');
  const videoRouter = express.Router();

//------------------------------------------
//------------------------------------------

  /**
   * post video
   */
  videoRouter.post('/', async (req, res) => {
    res.status(200).send();
    await videoPost(req.body, passdata);
  });
  /**
   * delete video
   */
  videoRouter.delete('/', async (req, res) => {
    await videoDelete(req.body, passdata);
    res.status(200).send();
  });

  /**
   * update video
   */
  videoRouter.put('/', async (req, res) => {
    res.status(200).send();
    await videoPutController(req.body, passdata);
  });

  /**
   * get one Video
   */
  videoRouter.get('/check/:vid', (req, res) => {
    videoCheckBoolean(req.params, passdata).then((value) => {
      res.status(200).send(value);
    });
  });
  /**
   * get one Video
   */
  videoRouter.get('/redownload/:vid', async (req, res) => {
    await videoRedownload(req.params, passdata);
    res.status(200).send();
  });
  /**
   * get one Video
   */
  videoRouter.get('/vid/:vid', async (req, res) => {
    let value = await comVideoGet(req.params);
    res.status(200).send(value);
  });

  /**
   * get all Video
   */
  videoRouter.get('/all', async (req, res) => {
    let value = await videoGetAll(null, passdata);
    res.status(200).send(value);
  });

  /**
   * get many video by title
   */
  videoRouter.get('/title/:title', (req, res) => {
    videoGetAllByLikeTitle(req.params, passdata).then((value) => {
      res.status(200).send(value);
    });
  });

  /**
   * get all video author
   */
  videoRouter.get('/authors', (req, res) => {
    videoFindAllAuthor().then((value) => {
      res.status(200).send(value);
    });
  });

  /**
   * get many video by author
   */
  videoRouter.get('/author/:author', (req, res) => {
    videoFindAllByAuthor(req.params, passdata).then((value) => {
      res.status(200).send(value);
    });
  });

  return videoRouter;
};

module.exports = wrapper;