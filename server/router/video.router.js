const wrapper = function(passdata) {
  const express = require('express');
  const videoRouter = express.Router();
  const {daoVideo} = require('../dao/video.dao');

//------------------------------------------
//------------------------------------------

  /**
   * post video
   */
  videoRouter.post('/', async (req, res) => {
    res.status(200).send();
    await daoVideo.videoPost(req.body, passdata);
  });
  /**
   * delete video
   */
  videoRouter.delete('/', async (req, res) => {
    res.status(200).send();
    await daoVideo.videoDelete(req.body, passdata);
  });

  /**
   * update video
   */
  videoRouter.put('/', async (req, res) => {
    res.status(200).send();
    await daoVideo.videoPut(req.body, passdata);
  });

  /**
   * get one Video
   */
  videoRouter.get('/check/:vid', async (req, res) => {
    let {vid} = req.params;
    let findOne = await daoVideo.videoCheck(vid);
    res.status(200).send(findOne);
  });

  /**
   * get one Video
   */
  videoRouter.get('/vid/:vid', async (req, res) => {
    let val = await daoVideo.videoGetByVid(req.params, passdata);
    res.status(200).send(val);
  });

  /**
   * get all Video
   */
  videoRouter.get('/all', async (req, res) => {
    let value = await daoVideo.videoGetAll(null, passdata);
    res.status(200).send(value);
  });

  /**
   * get many video by title
   */
  videoRouter.get('/title/:title', async (req, res) => {
    let value = await daoVideo.videoGetAllByLikeTitle(req.params, passdata);
    res.status(200).send(value);
  });

  /**
   * get all video author
   */
  videoRouter.get('/authors', async (req, res) => {
    const value = await daoVideo.videoGetAllAuthor(null, null);
    res.status(200).send(value);
  });

  /**
   * get many video by author
   */
  videoRouter.get('/author/:author', async (req, res) => {
    const value = await daoVideo.videoGetAllByAuthor(req.params, passdata);
    res.status(200).send(value);
  });

  return videoRouter;
};

module.exports = wrapper;