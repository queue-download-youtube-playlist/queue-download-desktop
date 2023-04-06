'use strict';
      
const {DataSource} = require('typeorm');
const {getEntitySchemaList} = require('./util.datasource.js');

const path = require('path');
const homedir = require('os').homedir();
let dbLocaltion = path.join(homedir,
  'AppData', 'Roaming', 'youtube_playlist_download_queue',
  'dbsqlite3', 'db.sqlite');

const entities = getEntitySchemaList();
const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: dbLocaltion,
  synchronize: true,
  logging: false,
  entities,
});

dataSource.initialize().then(() => {
  console.log('datasource init');
}).catch((err) => {
  console.log('datasource err');
  console.log(err);
});

module.exports = {
  dataSource: dataSource,
  dbInitValue: (callback) => {
    dataSource.initialize().then(async (connection) => {
      callback(connection)
    })
  }
};
