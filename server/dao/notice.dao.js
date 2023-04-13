function _notice_All_Client(message, passdata) {
  const clients = passdata.socketMap;
  Object.values(clients).forEach(conn => {
    conn?.send(JSON.stringify(message));
  });
}

/**
 *
 * @param message {Object :{vid:String, playlist:String}}
 * @param passdata app.js passdata
 */
function notice_browser_mp4(message, passdata) {
  _notice_All_Client({
    ...message,
    action: 'notice_browser_gogetmp4',
  }, passdata);
}

/**
 *
 * @param message{Object:{
 * title:String, text:String,timeout?:number}}
 * @param passdata
 */
function notice_browser_firefox_notice(message, passdata) {
  let {title, text} = message;
  let titleDefault = 'youtube playlist download queue', textDefault = '';
  title = title ? title : titleDefault;
  text = text ? text : textDefault;
  let timeout = 3;
  timeout = message.hasOwnProperty('timeout')
    ? message.timeout : timeout;

  _notice_All_Client({
      action: `notice_firefox_notice`,
      title: String(title),
      text: String(text),
      timeout: parseInt(String(timeout)),
    }, passdata,
  );
}

/**
 *
 * @param message{Object:{playlist:String}}
 * @param passdata
 */
function notice_browser_playlist(message, passdata) {
  let {playlist} = message;
  // console.log(`notice router noticePlaylist playlist=${playlist}`);
  let prefixPlaylist = 'https://www.youtube.com/playlist?list=';
  let url = prefixPlaylist.concat(playlist);
  _notice_All_Client({
    action: 'notice_browser_gogetplaylist', playlist, url,
    useExistsPlaylist: true,
  }, passdata);
}

//*****************************************************************************
/**
 *
 * @param data{String}
 * @return {Object}
 */
function handleDownloadingDataToJson(data) {
  let regDownInfo = /(?<=\[#\w{6} )(.+)(?=\])/;
  let regComplete = /Download complete/;
  if (regDownInfo.test(data)) {
    let mat = data.match(regDownInfo);

    let first = mat[0];
    let split = String(first).split(/\s/);
    if (split.length >= 3) {
      let itemSizeProgress = split[0];
      let filesize = 0;
      let progress = 0;
      // 237MiB/241MiB(98%)
      let regFileSize = /(?<=\/)(.+)(?=\()/;
      if (regFileSize.test(itemSizeProgress)) {
        let matFileSize = itemSizeProgress.match(regFileSize);
        filesize = matFileSize[0];
        let regProgress = /(?<=\()(.+)(?=\))/;
        let matProgress = itemSizeProgress.match(regProgress);
        progress = matProgress[0];
      }

      //
      let itemConnection = split[1];
      let regConnNum = /(?<=\:)(.+)/;
      let matConnNum = itemConnection.match(regConnNum);
      let cn = 0;
      cn = matConnNum[0];

      let itemDownloadSpeed = split[2];
      let regDownloadSpeed = /(?<=\:)(.+)/;
      let matDownloadSpeed = itemDownloadSpeed.match(regDownloadSpeed);
      let speed = '0';
      speed = matDownloadSpeed[0];

      let itemEstimatedTime = 'null';
      let eta = '0s';
      if (split.length === 4) {
        itemEstimatedTime = split[3];
        let regEta = /(?<=\:)(.+)/;
        let matEta = itemEstimatedTime.match(regEta);
        eta = matEta[0];

      }
      let obj = {
        filesize,
        progress,
        cn,
        speed,
        eta,

      };
      return obj;
    } else {
      return null;
    }
  } else if (regComplete.test(data)) {
    // console.log(data);
    // let obj = {
    //   data,
    //   dowhat: 'completeDownInfo',
    // };
    // return obj;
    return null;
  }
}

/**
 *
 * @param message{Object:{data:String, vid:String,video:Object}}
 * @param passdata
 * @return {Promise<void>}
 */
function notice_deskapp_downloading(message, passdata) {
  let {data, vid, video} = message;
  if (data) {

    let objReadable = handleDownloadingDataToJson(data);
    if (objReadable) {
      let message = {
        action: 'n_desk_',
        whichone: 'download',
        dowhat: 'updateDownInfo',
        vid,
        info: objReadable,
      };

      _notice_All_Client(message, passdata);
    } else {
      // objReadable is null or undefined
    }
  }
}

function notice_deskapp_download_complete(message, passdata) {
  let {vid} = message;
  if (vid) {
    let message = {
      action: 'n_desk_',
      whichone: 'download',
      dowhat: 'completeDownInfo',
      vid,
    };
    _notice_All_Client(message, passdata);
  }
}

function notice_deskapp_download_before(message, passdata) {
  let {vid, video} = message;
  if (vid) {
    let message = {
      action: 'n_desk_',
      whichone: 'download',
      dowhat: 'beforeDownInfo',
      vid,
      info: {vid, video},
    };
    _notice_All_Client(message, passdata);
  }
}

/**
 * 1 click search router
 *
 * 2 fetch all author
 *
 * 3 fetch author video
 *
 *
 * @param message{Object:{video:Object,vid:String}}
 * @param passdata
 */
function notice_deskapp_show_the_video(message, passdata) {
  let {video, vid} = message;
  if (vid) {
    let {author} = video;
    let message = {
      action: 'n_desk_',
      whichone: 'search',
      dowhat: 'showTheVideo',
      info: {author, vid},
    };
    _notice_All_Client(message, passdata);
  }
}

function notice_deskapp_fetch_all_author(passdata) {
  let message = {
    action: 'n_desk_',
    whichone: 'search',
    dowhat: 'fetchAllAuthor',
  };
  _notice_All_Client(message, passdata);
}

function notice_deskapp_queue_add(message, passdata) {
  let {queue} = message;
  console.log(`notice_deskapp_queue_add ... `);
  if (queue) {
    let message = {
      action: 'n_desk_',
      whichone: 'queue',
      dowhat: 'playlistAdd',
      info: queue,
    };
    _notice_All_Client(message, passdata);
  }
}

function notice_deskapp_queue_update(message, passdata) {
  let {queue} = message;
  console.log(`notice_deskapp_queue_update ... `);
  if (queue) {
    let message = {
      action: 'n_desk_',
      whichone: 'queue',
      dowhat: 'playlistUpdate',
      info: queue,
    };
    _notice_All_Client(message, passdata);
  }
}

function notice_deskapp_heartbeat(message, passdata) {
  _notice_All_Client({
    action: 'n_desk_',
    whichone: 'container',
    dowhat: 'heartFirefox',
    info: `${getCurrentTime()}`,
  }, passdata);
}

function getCurrentTime() {
  let date = new Date();
  date.getMonth();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let milliseconds = date.getMilliseconds();

  let dateFormat = `${hours}:${minutes}:${seconds}:${milliseconds}`;

  return dateFormat;
}

module.exports = {
  // notice_browser_image: notice_browser_image,
  notice_browser_mp4:
  notice_browser_mp4,

  notice_browser_playlist: notice_browser_playlist,
  notice_browser_firefox_notice: notice_browser_firefox_notice,

  // *********************************************************************

  notice_deskapp_download_before:
  notice_deskapp_download_before,

  notice_deskapp_download_complete:
  notice_deskapp_download_complete,

  notice_deskapp_downloading:
  notice_deskapp_downloading,

  notice_deskapp_show_the_video:
  notice_deskapp_show_the_video,

  notice_deskapp_fetch_all_author: notice_deskapp_fetch_all_author,

  notice_deskapp_queue_add: notice_deskapp_queue_add,
  notice_deskapp_queue_update: notice_deskapp_queue_update,

  notice_deskapp_heartbeat: notice_deskapp_heartbeat,

};