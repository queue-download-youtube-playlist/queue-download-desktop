'use strict';
      
const {DataSource} = require('typeorm');
const {
  getEntitySchemaList,
  getDatabasePath,
} = require('./util.datasource.js');

// const path = require('path');
// let databasePath = path.join('a', 'b', 'c', 'db.sqlite')
// database: databasePath, // create db.sqlite in databasePath
// database: 'db.sqlite', // create db.sqlite in rootDir
const dataSource = new DataSource({
  type: 'better-sqlite3',
  database: getDatabasePath(),
  synchronize: true,
  logging: false,
  entities: getEntitySchemaList(),
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
      callback(connection);
    })
  }
};
