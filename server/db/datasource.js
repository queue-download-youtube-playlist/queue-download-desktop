'use strict';
      
const {DataSource} = require('typeorm');
const {getEntitySchemaList} = require('./util.datasource.js');

const entities = getEntitySchemaList();
const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: 'C:\\Users\\littl\\AppData\\Roaming\\youtube playlist download queue\\dbsqlite3\\db.sqlite',
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