const {execSync} = require('node:child_process');

const {
  notice_browser_firefox_notice,
} = require('./notice.dao');

const {comVideoGet, comVideoUpdateExists}
  = require('./_common.dao');

let urlExtension =
  `"https://addons.mozilla.org/en-US/firefox/addon/youtube-playlist-download-win/"`;
let urlLocalhostIndex =
  `http://localhost:16206/`;

const urlList = {
  urlExtension: urlExtension,
  urlLocalhostIndex: urlLocalhostIndex,
};

/**
 *
 * @param url
 */
function openUrlByCmd(url) {
  try {
    execSync(`start "" ${url}`);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  openVideo: async (message, passdata) => {
    console.log('openVideofn ');
    let {vid} = message;
    let {exists, filepath} = await comVideoUpdateExists({vid});
    console.log('meslog ', `filepath=\n`, filepath);

    if (exists) {
      let cmd = `start "" "${filepath}" `;
      try {
        // todo exec cmd to open local video file
        execSync(cmd);
        // todo notice
        // await notice_browser_firefox_notice({
        //   title: 'open file success',
        //   text: '',
        // }, passdata);
      } catch (e) {
        // console.log(e);
        // todo notice
        let {downloading} = await comVideoGet({vid});
        if (downloading) {
          await notice_browser_firefox_notice({
            title: 'file is downloading',
            text: 'please wait a few times',
          }, passdata);
        } else {
          await notice_browser_firefox_notice({
            title: 'open failed!',
            text: 'file is used by another process',
          }, passdata);
        }
      }
    } else {
      // todo
      await notice_browser_firefox_notice({
        title: 'not exists! click redownload button',
        text: filepath,
        timeout: 5
      }, passdata);
    }

  },
  openExtensionPage: () => {
    openUrlByCmd(urlList.urlExtension);
  },
  openLocalhostIndex: () => {
    openUrlByCmd(urlList.urlLocalhostIndex);
  },
};
