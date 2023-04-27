require('fs');
const path = require('path');
const {exec} = require('node:child_process');

const {
  notice_browser_firefox_notice,
  notice_deskapp_downloading,
  notice_deskapp_queue_update,
  notice_deskapp_download_complete,
  notice_deskapp_download_before,
  notice_deskapp_show_the_video, notice_browser_mp4, notice_browser_gogetjpg,
} = require('../dao/notice.dao');
const {queueDownloadOne, queueUpdateProgress} = require('../dao/queue.dao');
const {taskFindAllFinishedTrue, taskUpdate} = require('../dao/task.dao');
const {configGetSavelocation} = require('../dao/config.dao');

const {
  comVideoGet, comVideoUpdateDownloading, comVideoUpdateExists,
  comVideoCheckAllDownloading, comNoticeMp4Check,
} = require('../dao/_common.dao');

/**
 * @param message{Object:{playlist:String, vid:String}}
 * @param passdata
 */
async function downloadNextVideo(message, passdata) {
  // 4 is it a task type ?        // 'playlist':{ index, playlist }
  // if has playlist, then update db, then playlist next.

  let {vid, playlist} = message;

  try {
    if (playlist) {
      // todo update task finished: true
      await taskUpdate({vid});

      // todo update queue progress
      let progress = await taskFindAllFinishedTrue({playlist});
      await queueUpdateProgress({playlist, progress});

      // todo notice deskapp playlist update progress
      notice_deskapp_queue_update({
        queue: {playlist, progress},
      }, passdata);

      // todo download next ytb video
      await queueDownloadOne({playlist}, passdata);
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
 * @param message{Object:{playlist:String, vid:String}}
 * @param passdata
 */
async function downloadingMP4(message, passdata) {
  let {vid} = message;
  let video = await comVideoGet({vid});
  let {filename, downlink} = video;

  let savelocation = await configGetSavelocation();
  let aria2c = getAria2EXE();
  const arr = [
    `"${aria2c}"`,
    `--file-allocation=none`,
    `--download-result=hide`,
    // `--max-connection-per-server=16`,
    `--split=200`,
    `--out="${filename}"`,
    `--dir="${savelocation}"`,
    downlink,
  ];
  let command = arr.reduce((str, val) =>
    str.concat(' ', val), ``).trim();

  //********************************************************************
  // console.log('command=', command);
  const coffeeProcess = exec(command);
  // todo download before show the video, scroll find it
  notice_deskapp_download_before({vid, video}, passdata);
  // notice_deskapp_show_the_video({vid, video}, passdata);
  notice_browser_gogetjpg({vid, filename}, passdata)

  coffeeProcess.stdout.on('data', (data) => {
    notice_deskapp_downloading({data, video, vid}, passdata);
  });
  coffeeProcess.stderr.on('data', (data) => {
    console.log(data);
  });
  coffeeProcess.on('close', async () => {
    await comVideoUpdateDownloading({vid});
    let {exists} = await comVideoUpdateExists({vid});
    if (exists) {
      await notice_browser_firefox_notice({
        title: 'download ok',
        text: `${filename}`,
      }, passdata);
      // todo notice deskapp download complete
      notice_deskapp_download_complete({vid}, passdata);

      console.log('download ok');
      // 4 download next video
      await downloadNextVideo(message, passdata);
    } else {
      // todo notice browser download mp4 again
      await comNoticeMp4Check(message, passdata);
      // todo notice download failed
      await notice_browser_firefox_notice({
        title: 'download failed, try again!',
        text: '',
      }, passdata);

    }
  });

}

/**
 *
 * @param message{Object:{playlist:String, vid:String}}
 * @param passdata
 */
async function downloadGoGetMP4(message, passdata) {
  let {vid} = message;
  let {title, downloading} = await comVideoGet({vid});

  console.log('meslog downloadGoGetMP4', `message=\n`,
    JSON.stringify(message));

  // todo downloadingLength downloading
  let {
    check,
    videos,
  } = await comVideoCheckAllDownloading();

  if (check) {
    let {exists} = await comVideoUpdateExists({vid});
    // todo false downloadingLength file exists?
    if (exists) {
      // todo true notice dont need download
      await notice_browser_firefox_notice({
        title: 'dont need download',
        text: `exists \n${title}`,
      }, passdata);
      // todo download next video by playlist
      await downloadNextVideo(message, passdata);
    } else {
      // todo update db
      await comVideoUpdateDownloading({vid});
      // todo download use cmd
      await downloadingMP4(message, passdata);

      // todo notice downloading
      await notice_browser_firefox_notice({
        title: 'start downloading',
        text: `${title}`,
      }, passdata);
    }

  } else {
    // await notice_browser_firefox_notice({
    //   title: `video is downloading`,
    //   text: `please wait a few times`,
    // }, passdata);

    if (downloading) {
      // todo true notice downloading
      // await notice_browser_firefox_notice({
      //   title: `${vid} file is downloading, please wait`,
      //   text: `${title}`,
      // }, passdata);
    }
    console.log('downloading videos=\n', videos.length);
  }

}

module.exports = {
  downloadGoGetMP4: downloadGoGetMP4,
};