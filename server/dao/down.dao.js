const {exec} = require('child_process');
const {daoNotice} = require('./notice.dao');
const {daoQueue} = require('./queue.dao');
const {daoFile} = require('./file.dao.js');
const path = require('path');
const {table} = require('../db/util.typeorm');

/**
 * cannot find the value!!!
 * @param message
 * @param passdata
 */
async function downloadNextVideo(message, passdata) {
  // 4 is it a task type ?        // 'playlist':{ index, playlist }
  // if has playlist, then update db, then playlist next.

  const {video, playlist} = message;
  const {vid} = video;
  try {
    if (playlist) {
      // todo update task finished: true
      await table.taskUpdate({finished: true}, {vid});

      // todo update queue progress
      let progress = await daoQueue.queueUpdateProgress({playlist});

      // todo notice deskapp playlist update progress
      daoNotice.notice_deskapp_queue_update({
        queue: {playlist, progress},
      }, passdata);

      // todo download next ytb video
      await daoQueue.queueDownloadOne({playlist}, passdata);
    }

  } catch (e) {
    // console.log(e);
  }
}

function getAria2EXE() {
  return path.join(__dirname, 'aria2_win64_build1', 'aria2c.exe');
}

/**
 *
 * @param message
 * @param passdata
 */
async function downloadMP4UseCMD(message, passdata) {
  let {video} = message;
  let {vid, downlink, filename} = video;
  let endsMP4 = `.mp4`;
  let fileNameMP4 = `${vid}${endsMP4}`;

  let {tmplocation} = await daoFile.getConfig();

  let aria2c = getAria2EXE();

  const arr = [
    `start`,
    `"downloading... ${filename}"`,
    `/MIN`,

    `"${aria2c}"`,
    `--file-allocation=none`,
    `--download-result=hide`,
    `--max-connection-per-server=16`,
    `--split=200`,
    `--out=${fileNameMP4}`,
    `--dir=${tmplocation}`,
    downlink,

    `&& exit`,
  ];
  let cmd = arr.reduce((str, val) => str.concat(' ').concat(val));

  // console.log('cmd=', cmd);
//  fs.writeFileSync('log', cmd);

  passdata.downloading = true;
  exec(cmd, async (error, stdout, stderr) => {
    passdata.downloading = false;

    if (error) {
      console.log(`error=`);
      console.log(error);
    } else {
      await downloadMP4OK(message, passdata, true);
    }
  });
}

/**
 *
 * @param message
 * @param passdata
 * @param moveFileBoolean{Boolean}
 * @returns {Promise<void>}
 */
async function downloadMP4OK(message, passdata, moveFileBoolean) {
  const {video, playlist} = message;
  const {vid, filename} = video;

  if (moveFileBoolean) {
    // console.log(`mp4 download finished ............................. `);
    let filesizeObj = await daoFile.checkOldMP4FileSize({vid});
    console.log(`filesizeObj=`);
    console.log(filesizeObj);

    if (filesizeObj) {
      let {
        iszero,
      } = filesizeObj;
      // console.log(`vid=${vid} size=${filesize}mb`);

      if (iszero) {
        daoNotice.notice_browser_firefox_notice({
          title: `download error! try again!`,
          text: `mp4 file size is 0`,
        }, passdata);
        await daoNotice.notice_browser_mp4({vid, playlist}, passdata);
      } else {

        // todo move the downlaoded mp4 file
        await daoFile.moveMP4({vid});

        // todo notice browser go got the jpg
        let message = {
          vid,
        };
        daoNotice.notice_browser_image(message, passdata);

        // todo notice download ok
        daoNotice.notice_browser_firefox_notice({
          title: 'download ok',
          text: `${filename}`,
        }, passdata);

      }

    } else {
      daoNotice.notice_browser_firefox_notice({
        title: 'cannot find mp4 file, tryagain!',
        text: `download again ...`,
      }, passdata);
      await daoNotice.notice_browser_mp4({vid, playlist}, passdata);

    }
  }

  // 4 download next video
  await downloadNextVideo(message, passdata);
}

/**
 *
 * @param message
 * @param passdata
 */
async function gotodownloadMP4(message, passdata) {
  let {video} = message;
  let {vid, title} = video;

  // file exsits ?
  let {exists} = await daoFile.checkNewPathMP4({vid});
  if (exists) {
    daoNotice.notice_browser_firefox_notice({
      title: 'dont need download',
      text: `exists \n${title}`,
    }, passdata);

    await downloadMP4OK(message, passdata, false);
  } else {
    if (passdata.downloading) {
      // comnotice.notice_browser_firefox_notice({
      //   text: `downloading something , please wait`,
      // }, passdata);
    } else {
      daoNotice.notice_browser_firefox_notice({
        title: 'downloading',
        text: `${title}`,
      }, passdata);

      // console.log('downloading .................................. ');
      await downloadMP4UseCMD(message, passdata);
    }
  }

}

const daoDownload = {
  gotodownloadMP4: gotodownloadMP4,
};

module.exports = {
  daoDownload: daoDownload,
};