const fs = require('fs');
const path = require('path');
const {execSync, exec} = require('node:child_process');

const {downloadGoGetMP4} = require('./download.controller');
const {videoPutDao} = require('../dao/video.dao');
const {
  comVideoGet, comVideoUpdateSearchingFalse, comVideoCheckAllDownloading,
  comVideoCheckAllSearching,
} = require(
  '../dao/_common.dao');
module.exports = {
  videoPutController: async (message, passdata) => {
    console.log(`meslog message=\n`, message);

    let {vid, playlist} = message;
    await videoPutDao(message);

    // todo update searching and gotodownload video mp4
    await comVideoUpdateSearchingFalse({vid});
    await downloadGoGetMP4({
      vid,
      playlist,
    }, passdata);

  },
};