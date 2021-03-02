const { app, BrowserWindow, dialog, ipcMain } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    minWidth: 290,
    minHeight: 300,
    webPreferences: {
      nodeIntegration: true,
      enableBlinkFeatures: 'CSSColorSchemeUARendering',
    },
  });
  win.removeMenu();
  win.loadFile('./src/index.html');
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on('fileSelectEmptyButton', (event) => {
  dialog.showOpenDialogSync(
    {
      title: 'Select Empty Image..',
      buttonLabel: 'Select',
      defaultPath: 'D:\\Code\\Elektron\\ctm-generator\\test',
      properties: ['openFile'],
      filters: [{ name: 'Images - PNG', extensions: ['png'] }],
    },
    (files) => {
      if (files !== undefined) {
        event.sender.send('emptyImageOpened', files);
      }
    }
  );
});

ipcMain.on('fileSelectBorderButton', (event) => {
  dialog.showOpenDialogSync(
    {
      title: 'Select Border Image..',
      buttonLabel: 'Select',
      defaultPath: 'D:\\Code\\Elektron\\ctm-generator\\test',
      properties: ['openFile'],
      filters: [{ name: 'Images - PNG', extensions: ['png'] }],
    },
    (files) => {
      if (files !== undefined) {
        event.sender.send('borderImageOpened', files);
      }
    }
  );
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
