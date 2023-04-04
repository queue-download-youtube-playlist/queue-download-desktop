const express = require('express');
const {WebSocketServer} = require('ws');
const http = require('http');

const cors = require('cors');
const bodyParser = require('body-parser');
const {v4: uuidv4} = require('uuid');
const {dbInitValue} = require('./db/datasource.js');
const fs = require('fs');
const {daoNotice} = require('./dao/notice.dao.js');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const socketMap = {};
const hostname = 'localhost';
const port = 16206;
const url = `http://${hostname}:${port}/`;

//------------------------------------------------------------------------------
const passdata = {
  socketMap: socketMap,
};

// step1: init a simple http server
const server = http.createServer(app);
// step2: init a websocketserver
const webSocketServer = new WebSocketServer({server});
webSocketServer.on('connection', (connect) => {
  const uuid = uuidv4();
  socketMap[uuid] = connect;
  console.log(`new uuid=\n`, uuid, `\n`);


  connect.on('message', (data) => { // heart_firefox
    let message = JSON.parse(String(data));
    switch (message['action']) {
      case 'heart_firefox':
        daoNotice.n_desk_HeartBeat(message, passdata);
        break;
      case 'login_desktop':
        console.log('desktop connected .....');
        break;
    }
  });
});

dbInitValue(async (connection) => {
  let findOneBy = await connection.getRepository('config').findOneBy({id: 1});
  const homedir = require('os').homedir();
  const path = require('path');
  let tmplocation = path.join(homedir,
      'AppData', 'Local', 'Temp', 'youtube playlist download queue');

  if (findOneBy === null) {
    let savelocation = path.join(homedir, 'Desktop', 'QueueDownload');
    let configObj = {savelocation, tmplocation};
    connection.getRepository('config').save(configObj);
    if (fs.existsSync(savelocation) === false) {
      fs.mkdirSync(savelocation, {recursive: true});
    }
  } else {
    fs.rmSync(tmplocation, {recursive: true, force: true});
  }
  if (fs.existsSync(tmplocation) === false) {
    fs.mkdirSync(tmplocation, {recursive: true});
  }

});
require('./util.express').setupRouterList(app, passdata);
server.listen(port, async () => {
  console.log(url);
  console.log(`started ${hostname} ${port} --- with websocket`);
});

module.exports = {
  url: url,
};