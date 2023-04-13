'use strict';

const {dataSource} = require('./datasource.js');
const {Like} = require('typeorm');

const table = {

  // config.entity.js
  // **************************************************************************
  /**
   * config repo
   * @returns {Promise<Repository>}
   */
  configRepo: async () => {
    return await dataSource.getRepository('config');
  },
  /**
   * save config
   * @param entityObj
   * @returns {Promise<void>}
   */
  configInsert: async (entityObj) => {
    await dataSource.getRepository('config').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>}
   */
  configDelete: async (options) => {
    return await dataSource.getRepository('config').delete(options);
  },
  /**
   * configNew, {id: 1}
   * @param configNew
   * @param options
   * @returns {Promise<{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}>}
   */
  configUpdate: async (configNew, options) => {
    await dataSource.getRepository('config').update(options, configNew);
    return await dataSource.getRepository('config').findOneBy(options);
  },
  /**
   * {} --> updateall
   *
   * @param configNew
   * @returns {Promise<void>}
   */
  configUpdateAll: async (configNew) => {
    await dataSource.getRepository('config').update({}, configNew);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<null|{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}>}
   */
  configFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('config').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<null|{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}>}
   */
  configFindOne: async (options) => {
    let ret = await dataSource.getRepository('config').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<[{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}]>}
   */
  configFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('config').find();
    } else {
      return await dataSource.getRepository('config').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<[{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}]>}
   */
  configFindWhere: async (options) => {
    return await dataSource.getRepository('config').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<[{"id":"number","savelocation":"string","tmplocation":"string","appdatacache":"string"}]>}
   */
  configFindWhereLike: async (options) => {
    const searchKey = Object.keys(options)[0];
    const searchVal = Object.values(options)[0];
    options[searchKey] = Like(`%${searchVal}%`);
    return await dataSource.getRepository('config').findBy(options);
  },

  // queue.entity.js
  // **************************************************************************
  /**
   * queue repo
   * @returns {Promise<Repository>}
   */
  queueRepo: async () => {
    return await dataSource.getRepository('queue');
  },
  /**
   * save queue
   * @param entityObj
   * @returns {Promise<void>}
   */
  queueInsert: async (entityObj) => {
    await dataSource.getRepository('queue').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>}
   */
  queueDelete: async (options) => {
    return await dataSource.getRepository('queue').delete(options);
  },
  /**
   * queueNew, {id: 1}
   * @param queueNew
   * @param options
   * @returns {Promise<{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}>}
   */
  queueUpdate: async (queueNew, options) => {
    await dataSource.getRepository('queue').update(options, queueNew);
    return await dataSource.getRepository('queue').findOneBy(options);
  },
  /**
   * {} --> updateall
   *
   * @param queueNew
   * @returns {Promise<void>}
   */
  queueUpdateAll: async (queueNew) => {
    await dataSource.getRepository('queue').update({}, queueNew);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<null|{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}>}
   */
  queueFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('queue').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<null|{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}>}
   */
  queueFindOne: async (options) => {
    let ret = await dataSource.getRepository('queue').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<[{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}]>}
   */
  queueFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('queue').find();
    } else {
      return await dataSource.getRepository('queue').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<[{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}]>}
   */
  queueFindWhere: async (options) => {
    return await dataSource.getRepository('queue').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<[{"total":"number","playlist":"string","title":"string","targetlink":"string","type":"number","isfinish":"number","progress":"number"}]>}
   */
  queueFindWhereLike: async (options) => {
    const searchKey = Object.keys(options)[0];
    const searchVal = Object.values(options)[0];
    options[searchKey] = Like(`%${searchVal}%`);
    return await dataSource.getRepository('queue').findBy(options);
  },

  // task.entity.js
  // **************************************************************************
  /**
   * task repo
   * @returns {Promise<Repository>}
   */
  taskRepo: async () => {
    return await dataSource.getRepository('task');
  },
  /**
   * save task
   * @param entityObj
   * @returns {Promise<void>}
   */
  taskInsert: async (entityObj) => {
    await dataSource.getRepository('task').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>}
   */
  taskDelete: async (options) => {
    return await dataSource.getRepository('task').delete(options);
  },
  /**
   * taskNew, {id: 1}
   * @param taskNew
   * @param options
   * @returns {Promise<{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}>}
   */
  taskUpdate: async (taskNew, options) => {
    await dataSource.getRepository('task').update(options, taskNew);
    return await dataSource.getRepository('task').findOneBy(options);
  },
  /**
   * {} --> updateall
   *
   * @param taskNew
   * @returns {Promise<void>}
   */
  taskUpdateAll: async (taskNew) => {
    await dataSource.getRepository('task').update({}, taskNew);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<null|{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}>}
   */
  taskFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('task').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<null|{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}>}
   */
  taskFindOne: async (options) => {
    let ret = await dataSource.getRepository('task').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<[{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}]>}
   */
  taskFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('task').find();
    } else {
      return await dataSource.getRepository('task').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<[{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}]>}
   */
  taskFindWhere: async (options) => {
    return await dataSource.getRepository('task').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<[{"tid":"string","vid":"string","index":"string","playlist":"string","finished":"number"}]>}
   */
  taskFindWhereLike: async (options) => {
    const searchKey = Object.keys(options)[0];
    const searchVal = Object.values(options)[0];
    options[searchKey] = Like(`%${searchVal}%`);
    return await dataSource.getRepository('task').findBy(options);
  },

  // video.entity.js
  // **************************************************************************
  /**
   * video repo
   * @returns {Promise<Repository>}
   */
  videoRepo: async () => {
    return await dataSource.getRepository('video');
  },
  /**
   * save video
   * @param entityObj
   * @returns {Promise<void>}
   */
  videoInsert: async (entityObj) => {
    await dataSource.getRepository('video').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>}
   */
  videoDelete: async (options) => {
    return await dataSource.getRepository('video').delete(options);
  },
  /**
   * videoNew, {id: 1}
   * @param videoNew
   * @param options
   * @returns {Promise<{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}>}
   */
  videoUpdate: async (videoNew, options) => {
    await dataSource.getRepository('video').update(options, videoNew);
    return await dataSource.getRepository('video').findOneBy(options);
  },
  /**
   * {} --> updateall
   *
   * @param videoNew
   * @returns {Promise<void>}
   */
  videoUpdateAll: async (videoNew) => {
    await dataSource.getRepository('video').update({}, videoNew);
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<null|{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}>}
   */
  videoFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('video').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<null|{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}>}
   */
  videoFindOne: async (options) => {
    let ret = await dataSource.getRepository('video').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<[{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}]>}
   */
  videoFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('video').find();
    } else {
      return await dataSource.getRepository('video').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<[{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}]>}
   */
  videoFindWhere: async (options) => {
    return await dataSource.getRepository('video').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<[{"vid":"string","filename":"string","filepath":"string","exists":"boolean","searching":"boolean","downloading":"boolean","vlink":"string","playlist":"string","quality":"string","size":"string","author":"string","title":"string","description":"string","downlink":"string"}]>}
   */
  videoFindWhereLike: async (options) => {
    const searchKey = Object.keys(options)[0];
    const searchVal = Object.values(options)[0];
    options[searchKey] = Like(`%${searchVal}%`);
    return await dataSource.getRepository('video').findBy(options);
  },

};

module.exports = {
  table: table,
};
