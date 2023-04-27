'use strict';
      
const {dataSource} = require('./datasource.js');

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
   * configNew1 => insert configNew1
   *
   * [configNew1, configNew2, ...] => insert configNew1, configNew2, ...
   * @param entityObj {[{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }]|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<InsertResult>}
   */
  configInsert: async (configNew) => {
    return await dataSource.getRepository('config').insert(configNew);
  },
  /**
   * {id: 1} => delete id=1
   *
   * {author: 'mary'} => delete all author='mary'
   * @param options {Object:{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<DeleteResult>}
   */
  configDelete: async (options) => {
    return await dataSource.getRepository('config').delete(options);
  },
  /**
   * (configNew, {id: 1}) // update configNew where id=1
   *
   * (configNew) => update all
   * @param configNew {{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @param options {{}|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}
   * @returns {Promise<UpdateResult>}
   */
  configUpdate: async (configNew, options = {}) => {
    return await dataSource.getRepository('config').update(options, configNew);
  },
  /**
   * {select: {bookName: true}, where: {id: 1}}
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {{select?: {savelocation?: boolean, tmplocation?: boolean, appdatacache?: boolean, id?: boolean, }, where?: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}}
   * @returns {Promise<null|{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }>}
   */
  configFindOne: async (options) => {
    let ret = await dataSource.getRepository('config').findOne(options);
    return ret ? ret : null;
  },
  /**
   * configFind() => find all
   * 
   * configFind({select: {bookName: true}})
   * 
   * configFind({select: {bookName: true, xxxx: true}, where: {author: Like('%mary%')}})
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {null|{select?: {savelocation?: boolean, tmplocation?: boolean, appdatacache?: boolean, id?: boolean, }, where?: {savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }}}
   * @returns {Promise<[{id?: number, savelocation: string, tmplocation: string, appdatacache: string, }]>}
   */
  configFind: async (options = null) => {
    return options
      ? await dataSource.getRepository('config').find(options)
      : await dataSource.getRepository('config').find();
  },
  /**
  * @param options {null|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }} { author: "mary" }
  * @return {Promise<number>}
  */
  configCount: async (options = null) => {
    return await dataSource.getRepository('config').countBy(options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }} { author: "mary" }
  * @return {Promise<number>}
  */
  configSum: async (columnName, options = null) => {
    return await dataSource.getRepository('config').sum(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }} { author: "mary" }
  * @return {Promise<number>}
  */
  configAverage: async (columnName, options = null) => {
    return await dataSource.getRepository('config').average(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }} null or  { author: "mary" }
  * @returns {Promise<{val:number, entity: {id?: number, savelocation: string, tmplocation: string, appdatacache: string, }}>} val => min value, entity => has the min value
  */
  configMinimum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('config').minimum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('config').findOneBy(findOption)
    return {val, entity}
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{savelocation?: string, tmplocation?: string, appdatacache?: string, id?: number, }} null or {author: "mary"}
  * @returns {Promise<{val:number, entity: {id?: number, savelocation: string, tmplocation: string, appdatacache: string, }}>} val => max value, entity => has the min value
  */
  configMaximum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('config').maximum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('config').findOneBy(findOption)
    return {val, entity}
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
   * queueNew1 => insert queueNew1
   *
   * [queueNew1, queueNew2, ...] => insert queueNew1, queueNew2, ...
   * @param entityObj {[{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }]|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<InsertResult>}
   */
  queueInsert: async (queueNew) => {
    return await dataSource.getRepository('queue').insert(queueNew);
  },
  /**
   * {id: 1} => delete id=1
   *
   * {author: 'mary'} => delete all author='mary'
   * @param options {Object:{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<DeleteResult>}
   */
  queueDelete: async (options) => {
    return await dataSource.getRepository('queue').delete(options);
  },
  /**
   * (queueNew, {id: 1}) // update queueNew where id=1
   *
   * (queueNew) => update all
   * @param queueNew {{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @param options {{}|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}
   * @returns {Promise<UpdateResult>}
   */
  queueUpdate: async (queueNew, options = {}) => {
    return await dataSource.getRepository('queue').update(options, queueNew);
  },
  /**
   * {select: {bookName: true}, where: {id: 1}}
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {{select?: {total?: boolean, title?: boolean, targetlink?: boolean, type?: boolean, isfinish?: boolean, progress?: boolean, playlist?: boolean, }, where?: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}}
   * @returns {Promise<null|{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }>}
   */
  queueFindOne: async (options) => {
    let ret = await dataSource.getRepository('queue').findOne(options);
    return ret ? ret : null;
  },
  /**
   * queueFind() => find all
   * 
   * queueFind({select: {bookName: true}})
   * 
   * queueFind({select: {bookName: true, xxxx: true}, where: {author: Like('%mary%')}})
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {null|{select?: {total?: boolean, title?: boolean, targetlink?: boolean, type?: boolean, isfinish?: boolean, progress?: boolean, playlist?: boolean, }, where?: {total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }}}
   * @returns {Promise<[{playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }]>}
   */
  queueFind: async (options = null) => {
    return options
      ? await dataSource.getRepository('queue').find(options)
      : await dataSource.getRepository('queue').find();
  },
  /**
  * @param options {null|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  queueCount: async (options = null) => {
    return await dataSource.getRepository('queue').countBy(options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  queueSum: async (columnName, options = null) => {
    return await dataSource.getRepository('queue').sum(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  queueAverage: async (columnName, options = null) => {
    return await dataSource.getRepository('queue').average(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }} null or  { author: "mary" }
  * @returns {Promise<{val:number, entity: {playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }}>} val => min value, entity => has the min value
  */
  queueMinimum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('queue').minimum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('queue').findOneBy(findOption)
    return {val, entity}
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{total?: number, title?: string, targetlink?: string, type?: number, isfinish?: number, progress?: number, playlist?: string, }} null or {author: "mary"}
  * @returns {Promise<{val:number, entity: {playlist?: string, total: number, title: string, targetlink: string, type: number, isfinish: number, progress: number, }}>} val => max value, entity => has the min value
  */
  queueMaximum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('queue').maximum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('queue').findOneBy(findOption)
    return {val, entity}
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
   * taskNew1 => insert taskNew1
   *
   * [taskNew1, taskNew2, ...] => insert taskNew1, taskNew2, ...
   * @param entityObj {[{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }]|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<InsertResult>}
   */
  taskInsert: async (taskNew) => {
    return await dataSource.getRepository('task').insert(taskNew);
  },
  /**
   * {id: 1} => delete id=1
   *
   * {author: 'mary'} => delete all author='mary'
   * @param options {Object:{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<DeleteResult>}
   */
  taskDelete: async (options) => {
    return await dataSource.getRepository('task').delete(options);
  },
  /**
   * (taskNew, {id: 1}) // update taskNew where id=1
   *
   * (taskNew) => update all
   * @param taskNew {{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @param options {{}|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}
   * @returns {Promise<UpdateResult>}
   */
  taskUpdate: async (taskNew, options = {}) => {
    return await dataSource.getRepository('task').update(options, taskNew);
  },
  /**
   * {select: {bookName: true}, where: {id: 1}}
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {{select?: {vid?: boolean, index?: boolean, playlist?: boolean, finished?: boolean, tid?: boolean, }, where?: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}}
   * @returns {Promise<null|{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }>}
   */
  taskFindOne: async (options) => {
    let ret = await dataSource.getRepository('task').findOne(options);
    return ret ? ret : null;
  },
  /**
   * taskFind() => find all
   * 
   * taskFind({select: {bookName: true}})
   * 
   * taskFind({select: {bookName: true, xxxx: true}, where: {author: Like('%mary%')}})
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {null|{select?: {vid?: boolean, index?: boolean, playlist?: boolean, finished?: boolean, tid?: boolean, }, where?: {vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }}}
   * @returns {Promise<[{tid?: string, vid: string, index: string, playlist: string, finished: boolean, }]>}
   */
  taskFind: async (options = null) => {
    return options
      ? await dataSource.getRepository('task').find(options)
      : await dataSource.getRepository('task').find();
  },
  /**
  * @param options {null|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  taskCount: async (options = null) => {
    return await dataSource.getRepository('task').countBy(options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  taskSum: async (columnName, options = null) => {
    return await dataSource.getRepository('task').sum(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  taskAverage: async (columnName, options = null) => {
    return await dataSource.getRepository('task').average(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }} null or  { author: "mary" }
  * @returns {Promise<{val:number, entity: {tid?: string, vid: string, index: string, playlist: string, finished: boolean, }}>} val => min value, entity => has the min value
  */
  taskMinimum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('task').minimum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('task').findOneBy(findOption)
    return {val, entity}
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{vid?: string, index?: string, playlist?: string, finished?: boolean, tid?: string, }} null or {author: "mary"}
  * @returns {Promise<{val:number, entity: {tid?: string, vid: string, index: string, playlist: string, finished: boolean, }}>} val => max value, entity => has the min value
  */
  taskMaximum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('task').maximum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('task').findOneBy(findOption)
    return {val, entity}
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
   * videoNew1 => insert videoNew1
   *
   * [videoNew1, videoNew2, ...] => insert videoNew1, videoNew2, ...
   * @param videoNew {[{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }]|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<InsertResult>}
   */
  videoInsert: async (videoNew) => {
    return await dataSource.getRepository('video').insert(videoNew);
  },
  /**
   * {id: 1} => delete id=1
   *
   * {author: 'mary'} => delete all author='mary'
   * @param options {Object:{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<DeleteResult>}
   */
  videoDelete: async (options) => {
    return await dataSource.getRepository('video').delete(options);
  },
  /**
   * (videoNew, {id: 1}) // update videoNew where id=1
   *
   * (videoNew) => update all
   * @param videoNew {{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @param options {{}|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}
   * @returns {Promise<UpdateResult>}
   */
  videoUpdate: async (videoNew, options = {}) => {
    return await dataSource.getRepository('video').update(options, videoNew);
  },
  /**
   * {select: {bookName: true}, where: {id: 1}}
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {{select?: {filename?: boolean, filepath?: boolean, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: boolean, playlist?: boolean, quality?: boolean, size?: boolean, author?: boolean, title?: boolean, description?: boolean, downlink?: boolean, vid?: boolean, }, where?: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}}
   * @returns {Promise<null|{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }>}
   */
  videoFindOne: async (options) => {
    let ret = await dataSource.getRepository('video').findOne(options);
    return ret ? ret : null;
  },
  /**
   * videoFind() => find all
   * 
   * videoFind({select: {bookName: true}})
   * 
   * videoFind({select: {bookName: true, xxxx: true}, where: {author: Like('%mary%')}})
   * 
   * [typeorm/docs/find-options.md](https://github.com/typeorm/typeorm/blob/master/docs/find-options.md#find-options)
   * @param options {null|{select?: {filename?: boolean, filepath?: boolean, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: boolean, playlist?: boolean, quality?: boolean, size?: boolean, author?: boolean, title?: boolean, description?: boolean, downlink?: boolean, vid?: boolean, }, where?: {filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }}}
   * @returns {Promise<[{vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }]>}
   */
  videoFind: async (options = null) => {
    return options
      ? await dataSource.getRepository('video').find(options)
      : await dataSource.getRepository('video').find();
  },
  /**
  * @param options {null|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  videoCount: async (options = null) => {
    return await dataSource.getRepository('video').countBy(options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  videoSum: async (columnName, options = null) => {
    return await dataSource.getRepository('video').sum(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "pageNumber"
  * @param options {null|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }} { author: "mary" }
  * @return {Promise<number>}
  */
  videoAverage: async (columnName, options = null) => {
    return await dataSource.getRepository('video').average(columnName, options)
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }} null or  { author: "mary" }
  * @returns {Promise<{val:number, entity: {vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }}>} val => min value, entity => has the min value
  */
  videoMinimum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('video').minimum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('video').findOneBy(findOption)
    return {val, entity}
  },
  /**
  * 
  * @param columnName {string} "publishYear"
  * @param options {null|{filename?: string, filepath?: string, exists?: boolean, searching?: boolean, downloading?: boolean, vlink?: string, playlist?: string, quality?: string, size?: string, author?: string, title?: string, description?: string, downlink?: string, vid?: string, }} null or {author: "mary"}
  * @returns {Promise<{val:number, entity: {vid?: string, filename: string, filepath: string, exists: boolean, searching: boolean, downloading: boolean, vlink: string, playlist: string, quality: string, size: string, author: string, title: string, description: string, downlink: string, }}>} val => max value, entity => has the min value
  */
  videoMaximum: async (columnName, options = null) => {
    let key_ = columnName
    let val = await dataSource.getRepository('video').maximum(columnName, options)
    let findOption = {}
    findOption[key_] = val
    let entity = await dataSource.getRepository('video').findOneBy(findOption)
    return {val, entity}
  },
  

}

module.exports = {
  table: table
}
