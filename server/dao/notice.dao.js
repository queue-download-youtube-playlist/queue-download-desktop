function _notice_All_Client(message, passdata) {
//  console.log('_notice_All_Client() message=\n', message);
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
  let {vid, playlist} = message;
  // console.log(`notice.dao.js notice_browser_mp4   vid ${vid}`, '\n', 'playlist=', playlist);

  if (vid) {
    let action = 'notice_browser_gogetmp4';

    let message = {
      vid,
      playlist,
      action,
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
function notice_browser_firefox_notice(message, passdata) {
  let {title, text} = message;
  let titleDefault = 'youtube playlist download playlist';
  if (title) {
  } else {
    title = titleDefault;
  }
  if (text) {
  } else {
    text = '';
  }

  _notice_All_Client(
    {
      action: `notice_firefox_notice`,

      title: String(title),
      text: String(text),
    }, passdata,
  );
}

/**
 * {vid, uuid}
 * @param message
 * @param passdata
 */
function notice_browser_image(message, passdata) {
  let {vid} = message;

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
 * @param message{Object:{playlist:String}}
 * @param passdata
 */
function notice_browser_playlist(message, passdata) {
  let {playlist} = message;
  // console.log(`notice router noticePlaylist playlist=${playlist}`);
  let prefixPlaylist = 'https://www.youtube.com/playlist?list=';
  let url = prefixPlaylist.concat(playlist);
  _notice_All_Client({
    'action': 'notice_browser_gogetplaylist',
    playlist,
    url,
    // type: `playlist`,
    active: true,
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
function notice_deskapp_fetch_author_video(message, passdata) {
  let {author} = message;
  if (author) {
    let message = {
      action: 'n_desk_',
      whichone: 'search',
      dowhat: 'fetchAuthorVideo',
      info: author,
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
  // console.log(`notice_desktop_queue_update ... `);
  if (queue) {
    let message = {
      'action': 'n_desk_',
      'whichone': 'playlist',
      'dowhat': 'playlistAdd',
      queue,
    };
    _notice_All_Client(message, passdata);
  }
}

function notice_deskapp_queue_update(message, passdata) {
  let {queue} = message;
  // console.log(`notice_desktop_queue_update ... `);
  if (queue) {
    let message = {
      'action': 'n_desk_',
      'whichone': 'playlist',
      'dowhat': 'playlistUpdate',
      queue,
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

const daoNotice = {
  notice_browser_image: notice_browser_image,
  notice_browser_mp4: notice_browser_mp4,
  notice_browser_playlist: notice_browser_playlist,
  notice_browser_firefox_notice: notice_browser_firefox_notice,

  // *********************************************************************

  notice_deskapp_fetch_author_video: notice_deskapp_fetch_author_video,
  notice_deskapp_fetch_all_author: notice_deskapp_fetch_all_author,


  notice_deskapp_queue_add: notice_deskapp_queue_add,
  notice_deskapp_queue_update: notice_deskapp_queue_update,


  notice_deskapp_heartbeat: notice_deskapp_heartbeat,

};

module.exports = {
  daoNotice: daoNotice,
};