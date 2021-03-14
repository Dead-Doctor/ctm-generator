const { app, BrowserWindow, dialog, ipcMain } = require('electron');
const {
  FILE_SELECT_EMPTY_BUTTON,
  FILE_SELECT_BORDER_BUTTON,
  EMPTY_IMAGE_OPENED,
  BORDER_IMAGE_OPENED,
  GENERATE,
  GENERATE_OUT,
} = require('./libs/constants.js');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 450,
    minWidth: 290,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'CSSColorSchemeUARendering',
    },
  });
  win.removeMenu();
  win.loadFile('./src/app/index.html');
  win.webContents.on('before-input-event', (event, input) => {
    if (input.control && input.key.toLowerCase() === 'd') {
      console.log('Developer Tools activated');
      win.webContents.openDevTools();
      event.preventDefault();
    }
  });
}

app.whenReady().then(createWindow);

ipcMain.on(FILE_SELECT_EMPTY_BUTTON, (event) => {
  const files = dialog.showOpenDialogSync({
    title: 'Select Empty Image..',
    buttonLabel: 'Select',
    defaultPath: process.cwd() + '\\test',
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
    defaultPath: process.cwd() + '\\test',
    properties: ['openFile'],
    filters: [{ name: 'Images - PNG', extensions: ['png'] }],
  });

  if (files !== undefined) {
    event.sender.send(BORDER_IMAGE_OPENED, files);
  }
});

ipcMain.on(GENERATE, (event) => {
  const folder = dialog.showOpenDialogSync({
    title: 'Select Output Folder..',
    buttonLabel: 'Select',
    defaultPath: process.cwd() + '\\out',
    properties: ['openDirectory'],
  });

  if (folder !== undefined) {
    event.sender.send(GENERATE_OUT, folder);
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
