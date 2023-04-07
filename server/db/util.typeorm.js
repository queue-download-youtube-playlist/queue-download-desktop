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
   * @returns {Promise<Object>}
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
   * {id: 1}
   * @param entityNew
   * @param options
   * @returns {Promise<Object>}
   */
  configUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('config').findOneBy(options);
    await dataSource.getRepository('config').merge(findObj, entityNew);
    return await dataSource.getRepository('config').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Object>}
   */
  configFindOneWhere: async (options) => {
    return await dataSource.getRepository('config').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Object>}
   */
  configFindOne: async (options) => {
    return await dataSource.getRepository('config').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Array>}
   */
  configFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('config').find();
    }else {
      return await dataSource.getRepository('config').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Array>}
   */
  configFindWhere: async (options) => {
    return await dataSource.getRepository('config').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<Array>}
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
   * @returns {Promise<Object>}
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
   * {id: 1}
   * @param entityNew
   * @param options
   * @returns {Promise<Object>}
   */
  queueUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('queue').findOneBy(options);
    await dataSource.getRepository('queue').merge(findObj, entityNew);
    return await dataSource.getRepository('queue').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Object>}
   */
  queueFindOneWhere: async (options) => {
    return await dataSource.getRepository('queue').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Object>}
   */
  queueFindOne: async (options) => {
    return await dataSource.getRepository('queue').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Array>}
   */
  queueFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('queue').find();
    }else {
      return await dataSource.getRepository('queue').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Array>}
   */
  queueFindWhere: async (options) => {
    return await dataSource.getRepository('queue').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<Array>}
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
   * @returns {Promise<Object>}
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
   * {id: 1}
   * @param entityNew
   * @param options
   * @returns {Promise<Object>}
   */
  taskUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('task').findOneBy(options);
    await dataSource.getRepository('task').merge(findObj, entityNew);
    return await dataSource.getRepository('task').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Object>}
   */
  taskFindOneWhere: async (options) => {
    return await dataSource.getRepository('task').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Object>}
   */
  taskFindOne: async (options) => {
    return await dataSource.getRepository('task').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Array>}
   */
  taskFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('task').find();
    }else {
      return await dataSource.getRepository('task').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Array>}
   */
  taskFindWhere: async (options) => {
    return await dataSource.getRepository('task').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<Array>}
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
   * @returns {Promise<Object>}
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
   * {id: 1}
   * @param entityNew
   * @param options
   * @returns {Promise<Object>}
   */
  videoUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('video').findOneBy(options);
    await dataSource.getRepository('video').merge(findObj, entityNew);
    return await dataSource.getRepository('video').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Object>}
   */
  videoFindOneWhere: async (options) => {
    return await dataSource.getRepository('video').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Object>}
   */
  videoFindOne: async (options) => {
    return await dataSource.getRepository('video').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<Array>}
   */
  videoFind: async (options) => {
    if (options === null) {
      return await dataSource.getRepository('video').find();
    }else {
      return await dataSource.getRepository('video').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<Array>}
   */
  videoFindWhere: async (options) => {
    return await dataSource.getRepository('video').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<Array>}
   */
  videoFindWhereLike: async (options) => {
    const searchKey = Object.keys(options)[0];
    const searchVal = Object.values(options)[0];
    options[searchKey] = Like(`%${searchVal}%`);
    return await dataSource.getRepository('video').findBy(options);
  },
  

}

module.exports = {
  table: table
}
