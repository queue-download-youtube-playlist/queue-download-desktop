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
   * Insert config
   * @param entityObj {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<void>}
   */
  configInsert: async (entityObj) => {
    await dataSource.getRepository('config').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<*>}
   */
  configDelete: async (options) => {
    return await dataSource.getRepository('config').delete(options);
  },
  /**
   * configNew, {id: 1}
   * @param configNew {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }>}
   */
  configUpdate: async (configNew, options) => {
    await dataSource.getRepository('config').update(options, configNew);
    return await dataSource.getRepository('config').findOneBy(options);
  },
  /**
   * {xxxxx: false}
   * 
   * @param configNew {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<void>}
   */
  configUpdateAll: async (configNew) => {
    await dataSource.getRepository('config').update({}, configNew);
  },
  /**
   * {id: 1}
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<null|{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }>}
   */
  configFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('config').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mary'}, where: {id: 1}}
   * @param options {select: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }, where: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<null|{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }>}
   */
  configFindOne: async (options) => {
    let ret = await dataSource.getRepository('config').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mary'}, where: {id: 1}}
   * @param options {null|{select: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }, where: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}}
   * @returns {Promise<[{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }]>}
   */
  configFind: async (options = null) => {
    if (options === null) {
      return await dataSource.getRepository('config').find();
    }else {
      return await dataSource.getRepository('config').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<[{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }]>}
   */
  configFindWhere: async (options) => {
    return await dataSource.getRepository('config').findBy(options);
  },
  /**
   * {name: 'mary'} to {name: Like('%mari%')}
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<[{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }]>}
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
   * Insert queue
   * @param entityObj {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<void>}
   */
  queueInsert: async (entityObj) => {
    await dataSource.getRepository('queue').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<*>}
   */
  queueDelete: async (options) => {
    return await dataSource.getRepository('queue').delete(options);
  },
  /**
   * queueNew, {id: 1}
   * @param queueNew {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }>}
   */
  queueUpdate: async (queueNew, options) => {
    await dataSource.getRepository('queue').update(options, queueNew);
    return await dataSource.getRepository('queue').findOneBy(options);
  },
  /**
   * {xxxxx: false}
   * 
   * @param queueNew {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<void>}
   */
  queueUpdateAll: async (queueNew) => {
    await dataSource.getRepository('queue').update({}, queueNew);
  },
  /**
   * {id: 1}
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<null|{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }>}
   */
  queueFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('queue').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mary'}, where: {id: 1}}
   * @param options {select: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }, where: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<null|{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }>}
   */
  queueFindOne: async (options) => {
    let ret = await dataSource.getRepository('queue').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mary'}, where: {id: 1}}
   * @param options {null|{select: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }, where: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}}
   * @returns {Promise<[{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }]>}
   */
  queueFind: async (options = null) => {
    if (options === null) {
      return await dataSource.getRepository('queue').find();
    }else {
      return await dataSource.getRepository('queue').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<[{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }]>}
   */
  queueFindWhere: async (options) => {
    return await dataSource.getRepository('queue').findBy(options);
  },
  /**
   * {name: 'mary'} to {name: Like('%mari%')}
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<[{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }]>}
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
   * Insert task
   * @param entityObj {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<void>}
   */
  taskInsert: async (entityObj) => {
    await dataSource.getRepository('task').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<*>}
   */
  taskDelete: async (options) => {
    return await dataSource.getRepository('task').delete(options);
  },
  /**
   * taskNew, {id: 1}
   * @param taskNew {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }>}
   */
  taskUpdate: async (taskNew, options) => {
    await dataSource.getRepository('task').update(options, taskNew);
    return await dataSource.getRepository('task').findOneBy(options);
  },
  /**
   * {xxxxx: false}
   * 
   * @param taskNew {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<void>}
   */
  taskUpdateAll: async (taskNew) => {
    await dataSource.getRepository('task').update({}, taskNew);
  },
  /**
   * {id: 1}
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<null|{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }>}
   */
  taskFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('task').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mary'}, where: {id: 1}}
   * @param options {select: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }, where: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<null|{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }>}
   */
  taskFindOne: async (options) => {
    let ret = await dataSource.getRepository('task').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mary'}, where: {id: 1}}
   * @param options {null|{select: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }, where: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}}
   * @returns {Promise<[{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }]>}
   */
  taskFind: async (options = null) => {
    if (options === null) {
      return await dataSource.getRepository('task').find();
    }else {
      return await dataSource.getRepository('task').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<[{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }]>}
   */
  taskFindWhere: async (options) => {
    return await dataSource.getRepository('task').findBy(options);
  },
  /**
   * {name: 'mary'} to {name: Like('%mari%')}
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<[{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }]>}
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
   * Insert video
   * @param entityObj {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<void>}
   */
  videoInsert: async (entityObj) => {
    await dataSource.getRepository('video').insert(entityObj);
  },
  /**
   * {id: 1}
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<*>}
   */
  videoDelete: async (options) => {
    return await dataSource.getRepository('video').delete(options);
  },
  /**
   * videoNew, {id: 1}
   * @param videoNew {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }>}
   */
  videoUpdate: async (videoNew, options) => {
    await dataSource.getRepository('video').update(options, videoNew);
    return await dataSource.getRepository('video').findOneBy(options);
  },
  /**
   * {xxxxx: false}
   * 
   * @param videoNew {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<void>}
   */
  videoUpdateAll: async (videoNew) => {
    await dataSource.getRepository('video').update({}, videoNew);
  },
  /**
   * {id: 1}
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<null|{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }>}
   */
  videoFindOneWhere: async (options) => {
    let ret = await dataSource.getRepository('video').findOneBy(options);
    return ret ? ret : null;
  },
  /**
   * {select: {name: 'mary'}, where: {id: 1}}
   * @param options {select: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }, where: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<null|{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }>}
   */
  videoFindOne: async (options) => {
    let ret = await dataSource.getRepository('video').findOne(options);
    return ret ? ret : null;
  },
  /**
   * null or {select: {name: 'mary'}, where: {id: 1}}
   * @param options {null|{select: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }, where: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}}
   * @returns {Promise<[{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }]>}
   */
  videoFind: async (options = null) => {
    if (options === null) {
      return await dataSource.getRepository('video').find();
    }else {
      return await dataSource.getRepository('video').find(options);
    }
  },
  /**
   * {id: 1}
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<[{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }]>}
   */
  videoFindWhere: async (options) => {
    return await dataSource.getRepository('video').findBy(options);
  },
  /**
   * {name: 'mary'} to {name: Like('%mari%')}
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<[{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }]>}
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
