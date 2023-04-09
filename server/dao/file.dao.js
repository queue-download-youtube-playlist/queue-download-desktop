const fs = require('fs');
const path = require('path');
const os = require('os');
const {table} = require('../db/util.typeorm.js');

const endsJPG = `.jpg`;
const endsMP4 = `.mp4`;

// const endsaria2 = `.aria2`;

async function getConfig() {
  const optionsId1 = {id: 1};
  return await table.configFindOneWhere(optionsId1);
}

/**
 *
 * @param video {Object:{vid:String}}
 */
async function common(video) {
  const {savelocation, tmplocation} = await getConfig();

  let {vid} = video;
  let findOneVideo = await table.videoFindOneWhere({vid});
  if (findOneVideo) {
    let {filename} = await findOneVideo;

    const oldfileNameJPG = `${vid}${endsJPG}`;
    const homedir = os.userInfo().homedir; // C:\Users\xxx\
    const oldPathJPG = path.join(homedir, 'Downloads', oldfileNameJPG);
    const newfilenameJPG = `${filename}${endsJPG}`;
    const newPathJPG = path.join(savelocation, newfilenameJPG);

    const oldfileNameMP4 = `${vid}${endsMP4}`;

    const oldPathMP4 = path.join(tmplocation, oldfileNameMP4);
    const newfileNameMP4 = `${filename}${endsMP4}`;
    const newPathMP4 = path.join(savelocation, newfileNameMP4);

    return {
      filename,

      oldfileNameJPG,
      oldPathJPG,
      newPathJPG,
      newfilenameJPG,
      oldfileNameMP4,
      oldPathMP4,
      newPathMP4,
      newfileNameMP4,

    };
  } else {
    return null;
  }

}

async function deleteDownloadedMP4JPG(video) {
  let map = await common(video);
  try {
    fs.unlinkSync(map.newPathMP4);
    fs.unlinkSync(map.newPathJPG);
    return true;
  } catch (e) {
    return false;
  }
}

async function moveMP4(video) {
  let map = await common(video);
  // console.log(`map=`);
  // console.log(map);

  let filename = map.newfileNameMP4;
  await new Promise(resolve => setTimeout(resolve, 1000))
  try {
    fs.renameSync(map.oldPathMP4, map.newPathMP4);
    console.log(`moved ok  \n${filename}`);
  } catch (e) {
    console.log(`moved failed !!! \n${filename}`);
    console.log(e);
  }
}

async function moveJPG(video) {
  let map = await common(video);

  let filename = map.newfilenameJPG;
  await new Promise(resolve => setTimeout(resolve, 3000));
  try {
    fs.renameSync(map.oldPathJPG, map.newPathJPG);
    console.log(`moved ok  \n${filename}`);

  } catch (e) {
    console.log(`moved failed !!! \n${filename}`);
    console.log(e);
  }
}

/**
 *
 * @param video{Object:{vid:String}}
 * @returns {Promise<{pathmp4:String, exists:Boolean}>}
 */
async function checkNewPathMP4(video) {
  try {
    let map = await common(video);
    let pathmp4 = map.newPathMP4;
    let exists = fs.existsSync(pathmp4);
    return {pathmp4, exists};
  } catch (e) {
    console.log(`e=\n`, e, `\n`);
    let pathmp4 = null;
    let exists = false;
    return {pathmp4, exists};
  }
}

/**
 *
 * @param video
 * @returns {Promise<{iszero: boolean, filesize: *}>}
 */
async function checkOldMP4FileSize(video) {
  const map = await common(video);
  try {
    const stats = fs.statSync(map.oldPathMP4);
    const filesizeinbt = stats.size;
    const iszero = filesizeinbt === 0;
    const filesizeinmb = filesizeinbt / (1024 * 1024);
    return {
      iszero, filesize: filesizeinmb,
    };
  } catch (e) {
    return null;
  }

}

const daoFile = {
  getConfig: getConfig,

  deleteDownloadedMP4JPG: deleteDownloadedMP4JPG,
  moveMP4: moveMP4,
  moveJPG: moveJPG,

  checkNewPathMP4: checkNewPathMP4,

  checkOldMP4FileSize: checkOldMP4FileSize,
};

module.exports = {
  daoFile: daoFile,
};