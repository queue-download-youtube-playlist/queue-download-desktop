const {exec} = require('child_process');
const {daoNotice} = require('./notice.dao');
const {daoQueue} = require('./queue.dao');
const {daoTask} = require('./task.dao');
const {daoFile} = require('./file.dao.js');
const path = require('path');
const fs = require('fs');

/**
 * cannot find the value!!!
 * @param queue
 * @param passdata
 */
async function step4(queue, passdata) {
  // 4 is it a task type ?        // 'queue':{ index, playlist }
  // if has queue, then update db, then queue next.
  try {
    if (queue) {
      let {index, playlist} = queue;
      let messageTaskUpdate = {
        'task': {index, playlist},
      };
      await daoTask.taskUpdateFinishedTrue(messageTaskUpdate, passdata);
      let messageQueueUpdateProgress = {
        'queue': {playlist},
      };
      let progress = await daoQueue.queueUpdateProgress(
          messageQueueUpdateProgress,
          passdata);
      if (progress) {
        let messageNoticeDesktop = {
          'queue': {
            playlist, progress,
          },
        };
        daoNotice.n_desk_QueueUpdate(messageNoticeDesktop, passdata);
      }

      let messageQueueDownloadOne = {
        'queue': {
          playlist,
          index,
        },
      };
      await daoQueue.queueDownloadOne(messageQueueDownloadOne, passdata);

    } else {
      // console.log(`step4 move.dao.js queue is null`, queue);
    }
  } catch (e) {
    // console.log(e);
  }
}

/**
 *
 * @param video {Object:{video}}
 * @param passdata
 * @param callbackwhenclose
 */
async function downloadMP4UseCMD(video, passdata, callbackwhenclose) {
  let {vid, downlink, title, filename} = video;
  let endsMP4 = `.mp4`;
  let fileNameMP4 = `${vid}${endsMP4}`;

  let tmpDir = await daoFile.getConfigTmplocation();
  // const arr2 = [
  //   `start`,
  //   `"download ${filename}"`,
  //   `/MIN`,
  //   `wget`,
  //   `-P ${tmpDir}`,
  //   `-O ${fileNameMP4}`,
  //   `${downlink}`,
  //
  // ];
  // let command = arr2.reduce((str, val) => str.concat(' ').concat(val));

  const aria2c = daoFile.getPatharia2c();
  const arr = [
    `start`,
    `"downloading... ${filename}"`,
    `/MIN`,

    aria2c,
    `--file-allocation=none`,
    `--download-result=hide`,
    `--max-connection-per-server=16`,
    `--split=200`,
    `--out=${fileNameMP4}`,
    `--dir=${tmpDir}`,
    downlink,

    `&& exit`,
  ];
  let command = arr.reduce((str, val) => str.concat(' ').concat(val));

  console.log('command=', command);
//  fs.writeFileSync('log', command);

  const coffeeProcess = exec(command);
  coffeeProcess.stdout.on('data', (data) => {
    daoNotice.n_desk_DownloadInfo({vid, title, data}, passdata);
    daoNotice.noticeDownloadInfo(data, passdata);
  });
  coffeeProcess.stderr.on('data', (data) => {
    // console.log('im here - error');
    // console.log('error' + data);
  });
  coffeeProcess.on('close', (code) => {
    // console.log(`close code=${code}`);
    callbackwhenclose(code);
  });

}

/**
 *
 * @param passdata
 * @param video
 * @param queue
 * @param moveFileBoolean{Boolean}
 * @returns {Promise<void>}
 */
async function downloadMP4OK(passdata, video, queue, moveFileBoolean) {
  const {vid, filename} = video;
  if (moveFileBoolean) {
    // console.log(`mp4 download finished ............................. `);
    let filesizeObj = await daoFile.checkOldMP4FileSize({vid});

    if (filesizeObj) {
      let {
        iszero,
        filesize,
      } = filesizeObj;
      // console.log(`vid=${vid} size=${filesize}mb`);

      if (iszero) {
        daoNotice.nb_notice({
          title: `download again!!!`,
          text: `mp4 file size is 0`,
        }, passdata);
        await daoNotice.noticebrowserMP4({vid, queue}, passdata);
      } else {

        // 2 move the downlaoded mp4 file
        await daoFile.moveMP4({vid});

        // 3 notice browser go got the jpg
        let message = {
          vid,
        };
        daoNotice.noticebrowserJPG(message, passdata);

        // notice download ok
        daoNotice.nb_notice({title: 'download ok', text: `${filename}`,}, passdata);
        // notice electron all author
        // daoNotice.n_desk_fetchAllAuthor(passdata)

      }

    } else {
      // comnotice.nb_notice({
      //   text: `cannot find mp4 file, download again ...`,
      // }, passdata);
      await daoNotice.noticebrowserMP4({vid, queue}, passdata);

    }
  }

  // 4 download next video
  // console.log('down.dao.js --> step4() \nqueue=', queue);
  await step4(queue, passdata);
}

/**
 *
 * @param message
 * @param passdata
 */
async function gotodownloadMP4(message, passdata) {
  let {video, queue} = message;
  let {vid, quality, filename, title} = video;

  // file exsits ?
  let {exists} = await daoFile.checkNewPathMP4({vid});
  if (exists) {
    daoNotice.noticebrowserFilenameExists(null, passdata);
    daoNotice.nb_notice({
      title: null,
      text: `mp4 exists \n${title}`,
    }, passdata);

    await downloadMP4OK(passdata, video, queue, false);
  } else {
    if (passdata.downloading) {
      // comnotice.nb_notice({
      //   text: `downloading something , please wait`,
      // }, passdata);
    } else {
      daoNotice.nb_notice({
        title: 'downloading',
        text: `${title}`,
      }, passdata);

      // console.log('downloading .................................. ');
      // when downloading update the state
      passdata.downloading = true;
      await downloadMP4UseCMD(video, passdata, async () => {
        // 1 update the downloading state
        passdata.downloading = false;

        await downloadMP4OK(passdata, video, queue, true);
      });
    }
  }

}

const daoDownload = {
  gotodownloadMP4: gotodownloadMP4,
};

module.exports = {
  daoDownload: daoDownload,
};