'use strict';

function getEntitySchemaList() {
  const {EntitySchema} = require('typeorm');
  const entities = [];

  const configObj = require('./entity/config.entity.js');
  const configEntitySchema = new EntitySchema(Object.create(configObj));
  entities.push(configEntitySchema);

  const queueObj = require('./entity/queue.entity.js');
  const queueEntitySchema = new EntitySchema(Object.create(queueObj));
  entities.push(queueEntitySchema);

  const taskObj = require('./entity/task.entity.js');
  const taskEntitySchema = new EntitySchema(Object.create(taskObj));
  entities.push(taskEntitySchema);

  const videoObj = require('./entity/video.entity.js');
  const videoEntitySchema = new EntitySchema(Object.create(videoObj));
  entities.push(videoEntitySchema);

  return entities;
}

function getDatabasePath() {
  const path = require('path');
  const homedir = require('os').homedir();
  let dbLocaltion = path.join(homedir,
    'AppData', 'Roaming', 'youtube_playlist_download_queue',
    'dbsqlite3', 'db.sqlite');
  return dbLocaltion;
}

module.exports = {
  getEntitySchemaList: getEntitySchemaList,
  getDatabasePath: getDatabasePath,
};
