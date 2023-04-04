function _notice_All_Client(message, passdata) {
//  console.log('_notice_All_Client() message=\n', message);
  const clients = passdata.socketMap;
  Object.values(clients).forEach(conn => {
    conn?.send(JSON.stringify(message));
  });
}

function noticeClientExpectSender(message, passdata) {
  // console.log('noticeClientExpectSender() message=\n', message);
  let {uuid} = message;
  const clients = passdata.socketMap;
  let tmpVal = clients[uuid];
  clients[uuid] = null;
  Object.values(clients).forEach(conn => {
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
  let {vid, queue} = message;
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
    _notice_All_Client(message, passdata);
  }
}

/**
 *
 * @param message{Object:{title:String, text:String}}
 * @param passdata
 */
function nb_notice(message, passdata) {
  let {title, text} = message;
  let titleDefault = 'youtube playlist download queue';
  if (title) {
  } else {
    title = titleDefault;
  }

  _notice_All_Client(
      {
        action: `nb_notice`,

        title: String(title),
        text: String(text),
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
//    _notice_All_Client(message, passdata);

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
    _notice_All_Client(message, passdata);

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
    _notice_All_Client(message, passdata);
  }
}

/**
 *
 * @param message{Object:{queue:{playlist:String, title:String}}}
 * @param passdata
 */
function noticebrowserPlaylist(message, passdata) {
  let {queue} = message;
  let {playlist, title} = queue;
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
    _notice_All_Client(message, passdata);
  }
}

function noticebrowserFilenameExists(message, passdata) {
  // console.log(`noticebrowserFilenameExists ...`);
  _notice_All_Client({
    'action': 'notice_browser_filename_exists',
    'info': '',
  }, passdata);
}

function noticebrowserQueueAdd(message, passdata) {
  // console.log(`n_desk_QueueAdd ... `);
  _notice_All_Client({
    'action': 'notice_browser_queue_add',
    'info': 'queue added!',
  }, passdata);
}

//*****************************************************************************

/**
 * 1 click search router
 *
 * 2 fetch all author
 *
 * 3 fetch author video
 *
 *
 * @param message
 * @param passdata
 */
function n_desk_fetchAuthorVideo(message, passdata) {
  let {author} = message;
  if (author) {
    let message = {
      action: 'n_desk_',
      whichone: 'search',
      dowhat: 'fetchAuthorVideo',
      info: author
    };
    _notice_All_Client(message, passdata);
  }
}

function n_desk_fetchAllAuthor(passdata) {
  let message = {
    action: 'n_desk_',
    whichone: 'search',
    dowhat: 'fetchAllAuthor',
  };
  _notice_All_Client(message, passdata);
}

function n_desk_QueueAdd(message, passdata) {
  let {queue} = message;
  let {playlist, title} = queue;
  // console.log(`notice_desktop_queue_add ... `);
  if (queue) {
    let message = {
      'action': 'n_desk_',
      'whichone': 'queue',
      'dowhat': 'queueAdd',
      queue: {
        playlist,
        title,
        total: 0,
      },
    };
    _notice_All_Client(message, passdata);
  }
}

function n_desk_QueueUpdate(message, passdata) {
  let {queue} = message;
  // console.log(`notice_desktop_queue_update ... `);
  if (queue) {
    let message = {
      'action': 'n_desk_',
      'whichone': 'queue',
      'dowhat': 'queueUpdate',
      queue,
    };
    _notice_All_Client(message, passdata);
  }
}

function n_desk_DownloadInfo(message, passdata) {
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
        'action': 'n_desk_',
        'whichone': 'download',
        'dowhat': 'updateInfo',
        'data': {
          vid,
          title,
          'info': first.trim(),
        },
      };
      _notice_All_Client(message, passdata);

    } else if (regExpDownloadComplete.test(data)) {
      let mat = data.match(regExpDownloadComplete);
      let first = mat[0];

      let message = {
        vid,
        'action': 'n_desk_',
        'whichone': 'download',
        'dowhat': 'cleanInfo',
      };
      _notice_All_Client(message, passdata);

    } else {

    }

  }
}

function n_desk_HeartBeat(message, passdata) {
  noticeClientExpectSender({
    action: 'n_desk_',
    whichone: 'container',
    dowhat: 'heartFirefox',
    info: `${getCurrent()}`,
  }, passdata);
}

function getCurrent() {
  let date = new Date();
  let month = date.getMonth();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  let dateFormat = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  return dateFormat;
}

const daoNotice = {
  noticebrowserJPG: noticebrowserJPG,
  noticebrowserMP4: noticebrowserMP4,
  noticebrowserPlaylist: noticebrowserPlaylist,

  n_desk_fetchAuthorVideo: n_desk_fetchAuthorVideo,
  n_desk_fetchAllAuthor: n_desk_fetchAllAuthor,
  n_desk_QueueAdd: n_desk_QueueAdd,
  n_desk_QueueUpdate: n_desk_QueueUpdate,
  noticebrowserFilenameExists: noticebrowserFilenameExists,
  n_desk_HeartBeat: n_desk_HeartBeat,
  n_desk_DownloadInfo: n_desk_DownloadInfo,

  nb_notice: nb_notice,

  noticeDownloadInfo: noticeDownloadInfo,
};
module.exports = {
  daoNotice: daoNotice,
};