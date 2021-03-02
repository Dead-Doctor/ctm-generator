const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const { FILE_SELECT_EMPTY_BUTTON, FILE_SELECT_BORDER_BUTTON, EMPTY_IMAGE_OPENED, BORDER_IMAGE_OPENED } = require('../utils/constants.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    minWidth: 290,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'CSSColorSchemeUARendering',
    },
  });
  win.removeMenu();
  win.loadFile('./src/app/index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on(FILE_SELECT_EMPTY_BUTTON, (event) => {
  const files = dialog.showOpenDialogSync({
    title: 'Select Empty Image..',
    buttonLabel: 'Select',
    defaultPath: 'D:\\Code\\Elektron\\ctm-generator\\test',
    properties: ['openFile'],
    filters: [{ name: 'Images - PNG', extensions: ['png'] }],
  });

  if (files !== undefined) {
    event.sender.send(EMPTY_IMAGE_OPENED, files);
  }
});

ipcMain.on(FILE_SELECT_BORDER_BUTTON, (event) => {
  const files = dialog.showOpenDialogSync({
    title: 'Select Border Image..',
    buttonLabel: 'Select',
    defaultPath: 'D:\\Code\\Elektron\\ctm-generator\\test',
    properties: ['openFile'],
    filters: [{ name: 'Images - PNG', extensions: ['png'] }],
  });

  if (files !== undefined) {
    event.sender.send(BORDER_IMAGE_OPENED, files);
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
