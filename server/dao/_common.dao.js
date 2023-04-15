const fs = require('fs');
const {table} = require('../db/util.typeorm');
const {notice_browser_mp4} = require('./notice.dao');

/**
 * canidownload-->true, go to download. false, please wait
 * @return {Promise<{videos: {vid: "string", filename: "string", filepath: "string", exists: "boolean", searching: "boolean", downloading: "boolean", vlink: "string", playlist: "string", quality: "string", size: "string", author: "string", title: "string", description: "string", downlink: "string"}[], check: boolean}>}
 */
async function comVideoCheckAllDownloading() {
  //await
  let videos = await table.videoFindWhere({downloading: true});
  let check = videos.length === 0;
  return {
    check,
    videos,
  };
}

/**
 *
 * @param message{Object:{vid:String}}
 */
async function comVideoUpdateDownloading(message) {
  let {vid} = message;
  let {downloading} = await table.videoFindOneWhere({vid});
  let downloadingNew = !downloading;
  await table.videoUpdate({downloading: downloadingNew}, {vid});
}

/**
 *
 * @return {Promise<{videos: {vid: "string", filename: "string", filepath: "string", exists: "boolean", searching: "boolean", downloading: "boolean", vlink: "string", playlist: "string", quality: "string", size: "string", author: "string", title: "string", description: "string", downlink: "string"}[], check: boolean}>}
 */
async function comVideoCheckAllSearching() {
  //await
  let videos = await table.videoFindWhere({searching: true});
  let check = videos.length === 0;
  return {
    check: check,
    videos: videos,
  };
}

/**
 *
 * @param message{Object:{vid:String}}
 * @param newVal{boolean}
 */
async function comVideoUpdateSearching(message, newVal) {
  let {vid} = message;
  await table.videoUpdate({searching: newVal}, {vid});
}

/**
 *
 * @param message{Object:{vid:String}}
 */
async function comVideoUpdateSearchingFalse(message) {
  await comVideoUpdateSearching(message, false);
}

/**
 *
 * @param message{Object:{vid:String}}
 */
async function comVideoUpdateSearchingTrue(message) {
  await comVideoUpdateSearching(message, true);
}

/**
 *
 * @param message{Object:{vid:String,playlist:String}}
 * @param passdata
 */
async function comNoticeMp4Check(message, passdata) {

  let {check, videos} = await comVideoCheckAllSearching();
  let {vid} = message;
  console.log(`meslog check=`, check, 'vid=', message.vid);

  if (check) { // no seaching, you can seaching video
    await comVideoUpdateSearchingTrue({vid});
    await notice_browser_mp4(message, passdata);
  }else {
    videos.forEach((value)=>{
      let {vid} = value
      console.log(`comNoticeMp4Check check=true vid=${vid}`)
    })
  }

}
//******************************************************************************
module.exports = {

  comNoticeMp4Check:
  comNoticeMp4Check,

  comVideoCheckAllSearching: comVideoCheckAllSearching,
  comVideoUpdateSearchingFalse:
  comVideoUpdateSearchingFalse,

  comVideoUpdateSearchingTrue: comVideoUpdateSearchingTrue,

  /**
   *
   * @param message{Object:{vid:String}}
   * @returns {Promise<{vid: "string", filename: "string", filepath: "string", exists: "boolean", searching: "boolean", downloading: "boolean", vlink: "string", playlist: "string", quality: "string", size: "string", author: "string", title: "string", description: "string", downlink: "string"}|null>}
   */
  comVideoGet: async (message) => {
    let {vid} = message;
    return await table.videoFindOneWhere({vid});
  },

  comVideoCheckAllDownloading:
  comVideoCheckAllDownloading,

  comVideoUpdateDownloading: comVideoUpdateDownloading,

  /**
   *
   * @param message{Object:{vid:String}}
   * @return {Promise<{filename: "string", filepath: "string", exists: boolean}>}
   */
  comVideoUpdateExists: async (message) => {
    let {vid} = message;
    let {filename, filepath} = await table.videoFindOneWhere({vid});

    let exists = fs.existsSync(filepath);
    await table.videoUpdate({exists}, {vid});

    return {exists, filename, filepath};
  },
};
