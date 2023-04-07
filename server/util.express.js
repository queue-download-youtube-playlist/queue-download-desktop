'use strict';

function setupRouterList(app, passdata) {
  const moveRouter = require('./router/move.router.js');
  app.use('/move', moveRouter(passdata));

  const noticeRouter = require('./router/notice.router.js');
  app.use('/notice', noticeRouter(passdata));

  const openRouter = require('./router/open.router.js');
  app.use('/open', openRouter(passdata));

  const queueRouter = require('./router/queue.router.js');
  app.use('/queue', queueRouter(passdata));

  const taskRouter = require('./router/task.router.js');
  app.use('/task', taskRouter(passdata));

  const videoRouter = require('./router/video.router.js');
  app.use('/video', videoRouter(passdata));

  
}

function getIPAddress() {
  let interfaces = require('os').networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal)
        return alias.address;
    }
  }
  return '0.0.0.0';
}

module.exports = {
  setupRouterList: setupRouterList,
  getIPAddress: getIPAddress,
};

