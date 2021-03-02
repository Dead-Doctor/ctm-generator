const { ipcRenderer } = require('electron');

document.querySelector('#fileSelectEmptyButton').addEventListener('click', () => {
  ipcRenderer.send('fileSelectEmptyButton');
});
document.querySelector('#fileSelectBorderButton').addEventListener('click', () => {
  ipcRenderer.send('fileSelectBorderButton');
});

ipcRenderer.on('emptyImageOpened', (event, files) => {
  console.log(files);
});
