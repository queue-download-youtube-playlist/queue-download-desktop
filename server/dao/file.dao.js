const fs = require('fs');
const path = require('path');
const os = require('os');
const {table} = require('../db/util.typeorm.js');

const endsJPG = `.jpg`;
const endsMP4 = `.mp4`;
const endsaria2 = `.aria2`;

async function getConfig() {
  const optionsId1 = {id: 1};
  return await table.configFindOneWhere(optionsId1);
}

async function getConfigSavelocation() {
  let config = await getConfig();
  return config.savelocation;
}

async function getConfigTmplocation() {
  let config = await getConfig();
  return config.tmplocation;
}

/**
 *
 * @param video {Object:{vid:String}}
 */
async function common(video) {
  const savelocation = await getConfigSavelocation();
  const tmplocation = await getConfigTmplocation();

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

async function getVideoPath(video) {
  let map = await common(video);
  return map.newPathMP4;
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
  setTimeout(async () => {
    let map = await common(video);
    let filename = map.newfileNameMP4;
    try {
      fs.renameSync(map.oldPathMP4, map.newPathMP4);
      console.log(`moved ok  \n${filename}`);
    } catch (e) {
      console.log(`moved failed !!! \n${filename}`);
      console.log(e);
    }
  }, 1000);
}

async function moveJPG(video) {
  setTimeout(async () => {
    let map = await common(video);
    let filename = map.newfilenameJPG;
    try {
      fs.renameSync(map.oldPathJPG, map.newPathJPG);
      console.log(`moved ok  \n${filename}`);
    } catch (e) {
      console.log(`moved failed !!! \n${filename}`);
      console.log(e);
    }
  }, 1000);
}

function getPatharia2c() {
  return path.join(__dirname, 'aria2_win64_build1', `aria2c.exe`);
}

async function checkUnnecessaryMP4() {
  let tmplocation = await getConfigTmplocation();
  let files = fs.readdirSync(tmplocation);
  let filter = files
      .filter(value => value.endsWith(endsMP4))
      .filter(value => value.endsWith(endsaria2));

  try {
    filter.forEach(value => {
      console.log('value=', value);

      let pathUnlink = path.join(tmplocation, value);
      fs.unlinkSync(pathUnlink);

    });
  } catch (e) {
    console.log(e);
  }
}

async function checkVidFilenamePathMP4(video) {
  let map = await common(video);
  return fs.existsSync(map.newPathMP4);
}

/**
 *
 * @param video
 * @returns {Promise<{iszero: boolean, filesize: *}>}
 */
async function checkFileSize(video) {
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
  getConfigSavelocation: getConfigSavelocation,
  getConfigTmplocation: getConfigTmplocation,

  deleteDownloadedMP4JPG: deleteDownloadedMP4JPG,
  moveMP4: moveMP4,
  moveJPG: moveJPG,

  checkVidFilenamePathMP4: checkVidFilenamePathMP4,
  checkUnnecessaryMP4: checkUnnecessaryMP4,

  checkFileSize: checkFileSize,
  getPatharia2c: getPatharia2c,
  getVideoPath: getVideoPath,
};

module.exports = {
  daoFile: daoFile,
};