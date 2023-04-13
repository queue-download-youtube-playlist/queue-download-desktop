const {app, BrowserWindow, screen, session} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}
// auto update electron app
require('update-electron-app')();
// express js server
let {expressStart} = require('../server/app');

const createWindow = () => {
  const {width, height} = screen.getPrimaryDisplay().workArea;
  const number = 0.6;
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    icon: path.join('image', 'icon.ico'),

    minWidth: width * number,
    minHeight: height * number,
    center: true,
    autoHideMenuBar: true,
    disableAutoHideCursor: true,
    maximizable: true,

    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      allowRunningInsecureContent: true,
      webSecurity: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.maximize()

  session
    .defaultSession
    .webRequest
    .onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['*'],
        },
      });
    });

  // Open the DevTools.
//  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
