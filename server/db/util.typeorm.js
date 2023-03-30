'use strict';
      
const {dataSource} = require('./datasource.js');
const {Like} = require('typeorm');

const table = {
  
  // config.entity.js
  // **************************************************************************
  /**
   * config repo
   * @returns {Promise<*>}
   */
  configRepo: async () => {
    return await dataSource.getRepository('config');
  },
  /**
   * save config
   * @param entityObj
   * @returns {Promise<void>}
   */
  configSave: async (entityObj) => {
    return await dataSource.getRepository('config').save(entityObj);
  },
  /**
   * delete config
   * @param options
   * @returns {Promise<*>}
   */
  configDelete: async (options) => {
    return await dataSource.getRepository('config').delete(options);
  },
  /**
   * update config
   * @param entityNew
   * @param options
   * @returns {Promise<void>}
   */
  configUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('config').findOneBy(options);
    await dataSource.getRepository('config').merge(findObj, entityNew);
    return await dataSource.getRepository('config').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>} findObj
   */
  configFindOneWhere: async (options) => {
    return await dataSource.getRepository('config').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>} findObj
   */
  configFindOne: async (options) => {
    return await dataSource.getRepository('config').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  configFindWhere: async (options) => {
    return await dataSource.getRepository('config').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  queueRepo: async () => {
    return await dataSource.getRepository('queue');
  },
  /**
   * save queue
   * @param entityObj
   * @returns {Promise<void>}
   */
  queueSave: async (entityObj) => {
    return await dataSource.getRepository('queue').save(entityObj);
  },
  /**
   * delete queue
   * @param options
   * @returns {Promise<*>}
   */
  queueDelete: async (options) => {
    return await dataSource.getRepository('queue').delete(options);
  },
  /**
   * update queue
   * @param entityNew
   * @param options
   * @returns {Promise<void>}
   */
  queueUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('queue').findOneBy(options);
    await dataSource.getRepository('queue').merge(findObj, entityNew);
    return await dataSource.getRepository('queue').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>} findObj
   */
  queueFindOneWhere: async (options) => {
    return await dataSource.getRepository('queue').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>} findObj
   */
  queueFindOne: async (options) => {
    return await dataSource.getRepository('queue').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  queueFindWhere: async (options) => {
    return await dataSource.getRepository('queue').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  taskRepo: async () => {
    return await dataSource.getRepository('task');
  },
  /**
   * save task
   * @param entityObj
   * @returns {Promise<void>}
   */
  taskSave: async (entityObj) => {
    return await dataSource.getRepository('task').save(entityObj);
  },
  /**
   * delete task
   * @param options
   * @returns {Promise<*>}
   */
  taskDelete: async (options) => {
    return await dataSource.getRepository('task').delete(options);
  },
  /**
   * update task
   * @param entityNew
   * @param options
   * @returns {Promise<void>}
   */
  taskUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('task').findOneBy(options);
    await dataSource.getRepository('task').merge(findObj, entityNew);
    return await dataSource.getRepository('task').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>} findObj
   */
  taskFindOneWhere: async (options) => {
    return await dataSource.getRepository('task').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>} findObj
   */
  taskFindOne: async (options) => {
    return await dataSource.getRepository('task').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  taskFindWhere: async (options) => {
    return await dataSource.getRepository('task').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  videoRepo: async () => {
    return await dataSource.getRepository('video');
  },
  /**
   * save video
   * @param entityObj
   * @returns {Promise<void>}
   */
  videoSave: async (entityObj) => {
    return await dataSource.getRepository('video').save(entityObj);
  },
  /**
   * delete video
   * @param options
   * @returns {Promise<*>}
   */
  videoDelete: async (options) => {
    return await dataSource.getRepository('video').delete(options);
  },
  /**
   * update video
   * @param entityNew
   * @param options
   * @returns {Promise<void>}
   */
  videoUpdate: async (entityNew, options) => {
    const findObj = await dataSource.getRepository('video').findOneBy(options);
    await dataSource.getRepository('video').merge(findObj, entityNew);
    return await dataSource.getRepository('video').save(findObj)
  },
  /**
   * {id: 1}
   * @param options
   * @returns {Promise<*>} findObj
   */
  videoFindOneWhere: async (options) => {
    return await dataSource.getRepository('video').findOneBy(options);
  },
  /**
   * {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>} findObj
   */
  videoFindOne: async (options) => {
    return await dataSource.getRepository('video').findOne(options);
  },
  /**
   * null or {select: {name: 'mari'}, where: {id: 1}}
   * @param options
   * @returns {Promise<*>}
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
   * @returns {Promise<*>}
   */
  videoFindWhere: async (options) => {
    return await dataSource.getRepository('video').findBy(options);
  },
  /**
   * {name: 'mari'} to {name: Like('%mari%')}
   * @param options
   * @returns {Promise<*>}
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
