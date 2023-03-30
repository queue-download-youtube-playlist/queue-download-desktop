'use strict';
      
const {EntitySchema} = require('typeorm');

function getEntitySchemaList() {
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

module.exports = {
  getEntitySchemaList: getEntitySchemaList,
};
