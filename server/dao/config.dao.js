const fs = require('fs');
const path = require('path');
const {table} = require('../db/util.typeorm');
const homedir = require('os').homedir();

async function getConfig() {
  const optionsId1 = {id: 1};
  let object = await table.configFindOneWhere(optionsId1);
  return object;
}

/**
 *
 * @return {Promise<'string'>}
 */
async function getSavelocation() {
  let {savelocation} = await getConfig();
  return savelocation;
}

/**
 *
 * @param filename
 * @return {Promise<string>}
 */
async function getFilepathSavelocation(filename) {
  let {savelocation} = await getConfig();
  let filepath = path.join(savelocation, filename);
  return filepath;
}

function checkDir(savelocation, appdatacache, tmplocation) {
  if (fs.existsSync(savelocation) === false) {
    fs.mkdirSync(savelocation, {recursive: true});
  }
  if (fs.existsSync(appdatacache) === false) {
    fs.mkdirSync(appdatacache, {recursive: true});
  }
  if (fs.existsSync(tmplocation)) {
    fs.rmSync(tmplocation, {recursive: true, force: true});
    fs.mkdirSync(tmplocation, {recursive: true});
  }
}

async function configInit() {
  let options = {id: 1};
  let findOneBy = await table.configFindOneWhere(options);

  if (findOneBy) {
    let {
      savelocation, tmplocation, appdatacache,
    } = findOneBy
    checkDir(savelocation, appdatacache, tmplocation);
  }else {
    let tmplocation = path.join(homedir, 'AppData', 'Local', 'Temp',
      'youtube_playlist_download_queue');
    let savelocation = path.join(homedir, 'Desktop', 'QueueDownload');
    let appdatacache = path.join(homedir, 'AppData', 'Roaming',
      'youtube_playlist_download_queue', 'downloadvideo');

    let configObj = {
      savelocation, tmplocation, appdatacache,
    };
    await table.configInsert(configObj);
    checkDir(savelocation,appdatacache,tmplocation)
  }

}

//*****************************************************************************
module.exports = {
  configInit: configInit,
  configGetSavelocation: getSavelocation,
  configGetFilepathSavelocation: getFilepathSavelocation,

};