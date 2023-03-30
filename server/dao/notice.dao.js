function noticeAllClient(message, passdata) {
//  console.log('noticeAllClient() message=\n', message);
  const clients = passdata.socketList;
  Object.keys(clients).forEach(key => {
    let conn = clients[key];
    conn?.send(JSON.stringify(message));
  });
}

function noticeClientExpectSender(message, passdata) {
  // console.log('noticeClientExpectSender() message=\n', message);
  let {uuid} = message;
  const clients = passdata.socketList;
  let tmpVal = clients[uuid];
  clients[uuid] = null;
  Object.keys(clients).forEach(key => {
    let conn = clients[key];
    conn?.send(JSON.stringify(message));
  });
  clients[uuid] = tmpVal;
}

/**
 *
 * @param message {Object :{vid, uuid}}
 * @param passdata app.js passdata
 */
async function noticebrowserMP4(message, passdata) {
  let {vid, uuid, queue} = message;
  // console.log(`notice.dao.js noticebrowserMP4   vid ${vid}`, '\n', 'queue=', queue);

  if (vid) {
    const prefixWatch = 'https://www.youtube.com/watch?v=';
    let action = 'notice_browser_gogetmp4';
    let videourl = prefixWatch.concat(vid);

    let message = {
      vid,
      queue,
      action,
      videourl,
      // type: `xdownload`,
    };
    noticeAllClient(message, passdata);
  }
}

function noticebrowserSendMessageToNotice(message, passdata) {
  let {text} = message;
  noticeAllClient(
      {
        action: `notice_browser_sendmessagetonotice`,
        text: String(text),
        close: {
          timeout: 3,
        },
      }, passdata,
  );
}

function noticeDownloadInfo(data, passdata) {
  let regDownloading = /(?<=\[#\w{6})(.+)(?=\])/;
  let regExpDownloadComplete = /.+(?=Download complete)/i;

  if (regDownloading.test(data)) {
    let mat = data.match(regDownloading);
    let first = mat[0];

    let message = {
      text: first,
      action: `notice_browser_sendmessagetonotice`,
    };
//    noticeAllClient(message, passdata);

  } else if (regExpDownloadComplete.test(data)) {
    let mat = data.match(regExpDownloadComplete);
    let first = mat[0];

    let message = {
      text: `video download ok`,
      action: `notice_browser_sendmessagetonotice`,
      close: {
        timeout: 3,
      },
    };
    noticeAllClient(message, passdata);

  } else {

  }
}

/**
 * {vid, uuid}
 * @param message
 * @param passdata
 */
function noticebrowserJPG(message, passdata) {
  let {vid, uuid} = message;

  // console.log(`notice router jpg vid ${vid}`);
  if (vid) {
    let message = {
      'action': 'notice_browser_gogetjpg',
      vid,
      'url': `https://img.youtube.com/vi/${vid}/maxresdefault.jpg`,
      // type: `image`,
    };
    noticeAllClient(message, passdata);
  }
}

/**
 *
 * @param message{Object:{queue:{playlist:String, title:String}}}
 * @param passdata
 */
function noticebrowserPlaylist(message, passdata) {
  let {queue} = message;
  let {playlist, uuid, title} = queue;
  // console.log(`notice router noticePlaylist playlist=${playlist}`);
  if (playlist) {
    let prefixPlaylist = 'https://www.youtube.com/playlist?list=';
    let url = prefixPlaylist.concat(playlist);
    let message = {
      'action': 'notice_browser_gogetplaylist',
      queue: {
        playlist,
        title,
      },
      url,
      // type: `playlist`,
      active: true,
    };
    noticeAllClient(message, passdata);
  }
}

function noticebrowserFilenameExists(message, passdata) {
  // console.log(`noticebrowserFilenameExists ...`);
  noticeAllClient({
    'action': 'notice_browser_filename_exists',
    'info': '',
  }, passdata);
}

function noticebrowserQueueAdd(message, passdata) {
  // console.log(`noticedesktopQueueAdd ... `);
  noticeAllClient({
    'action': 'notice_browser_queue_add',
    'info': 'queue added!',
  }, passdata);
}

//*****************************************************************************

function noticedesktopQueueAdd(message, passdata) {
  let {queue} = message;
  let {playlist, uuid, title} = queue;
  // console.log(`notice_desktop_queue_add ... `);
  if (queue) {
    let message = {
      'action': 'notice_desktop_queue_add',
      'whichone': 'queue',
      'dowhat': 'queueAdd',
      queue: {
        playlist,
        title,
        total: 0,
      },
    };
    noticeAllClient(message, passdata);
  }
}

function noticedesktopQueueUpdate(message, passdata) {
  let {queue} = message;
  // console.log(`notice_desktop_queue_update ... `);
  if (queue) {
    let message = {
      'action': 'notice_desktop_queue_update',
      'whichone': 'queue',
      'dowhat': 'queueUpdate',
      queue,
    };
    noticeAllClient(message, passdata);
  }
}

function noticedesktopDownloadInfo(message, passdata) {
  let {data, vid, title} = message;
  // console.log(`notice_desktop_download_info ... `);
  if (data) {

    let regDownloading = /(?<=\[#\w{6})(.+)(?=\])/;
    let regExpDownloadComplete = /.+(?=Download complete)/i;

    if (regDownloading.test(data)) {
      let mat = data.match(regDownloading);
      let first = mat[0];

      //[#2292c6 123MiB/388MiB(31%) CN:16 DL:867KiB ETA:5m12s]

      // http://localhost:5173/video-list#G_3iX_6sb7M
      let message = {
        'action': 'notice_desktop_download_info',
        'whichone': 'download',
        'dowhat': 'updateInfo',
        'data': {
          vid,
          title,
          'info': first.trim(),
        },
      };
      noticeAllClient(message, passdata);

    } else if (regExpDownloadComplete.test(data)) {
      let mat = data.match(regExpDownloadComplete);
      let first = mat[0];

      let message = {
        vid,
        'action': 'notice_desktop_download_info',
        'whichone': 'download',
        'dowhat': 'cleanInfo',
      };
      noticeAllClient(message, passdata);

    } else {

    }

  }
}

function getCurrent() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  let dateFormat = `${hours}:${minutes}:${seconds}`;

  return dateFormat;
}

function noticedesktopHeartFirefox(message, passdata) {
  let {uuid} = message;
  noticeClientExpectSender({
    uuid,
    action: 'notice_desktop_heart_firefox',
    whichone: 'container',
    dowhat: 'heartFirefox',
    info: `${getCurrent()}`,
  }, passdata);
}

const daoNotice = {
  noticebrowserJPG: noticebrowserJPG,
  noticebrowserMP4: noticebrowserMP4,
  noticebrowserPlaylist: noticebrowserPlaylist,

  noticedesktopQueueAdd: noticedesktopQueueAdd,
  noticedesktopQueueUpdate: noticedesktopQueueUpdate,
  noticebrowserFilenameExists: noticebrowserFilenameExists,
  noticedesktopHeartFirefox: noticedesktopHeartFirefox,
  noticedesktopDownloadInfo: noticedesktopDownloadInfo,

  noticebrowserSendMessageToNotice: noticebrowserSendMessageToNotice,

  noticeDownloadInfo: noticeDownloadInfo,
};
module.exports = {
  daoNotice: daoNotice,
};