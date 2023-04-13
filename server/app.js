'use strict';
const path = require('path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const {WebSocketServer} = require('ws');
const http = require('http');
const {v4: uuidv4} = require('uuid');

const {setupRouterList} = require('./util.express');
const {notice_deskapp_heartbeat} = require('./dao/notice.dao');
const {dbInitFnController} = require('./controller/dbinit.controller');

//------------------------------------------------------------

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.static(path.join(__dirname, 'public')));

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

  function handleReceiveMessage(data) {
    let message = JSON.parse(String(data));
    switch (message['action']) {
      case 'heart_firefox':
        notice_deskapp_heartbeat(message, passdata);
        break;
      case 'login_desktop':
        console.log('desktop connected .....');
        break;
    }
  }

  connect.on('message', (data) => { // heart_firefox
    handleReceiveMessage(data);
  });
});

dbInitFnController().then(r => null);
setupRouterList(app, passdata);
server.listen(port, () => {
  console.clear();
  console.log(`process.versions.modules=${process.versions.modules}`);
  console.log(url);
  console.log(`started ${hostname} ${port} --- with websocket`);

});

module.exports = {
  expressStart: 'expressStart',
};