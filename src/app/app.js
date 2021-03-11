const { ipcRenderer } = require('electron');
const { advancedCtx } = require('../../utils/canvasTools');
const {
  FILE_SELECT_EMPTY_BUTTON,
  FILE_SELECT_BORDER_BUTTON,
  EMPTY_IMAGE_OPENED,
  BORDER_IMAGE_OPENED,
} = require('../../utils/constants.js');

const emptyImage = document.getElementById('fileSelectEmptyPreview');
const borderImage = document.getElementById('fileSelectBorderPreview');

const generateBtn = document.getElementById('generateBtn');

const resultCanvas = document.getElementById('resultCanvas');

document.getElementById('fileSelectEmptyBtn').addEventListener('click', () => {
  ipcRenderer.send(FILE_SELECT_EMPTY_BUTTON);
});
document.getElementById('fileSelectBorderBtn').addEventListener('click', () => {
  ipcRenderer.send(FILE_SELECT_BORDER_BUTTON);
});

ipcRenderer.on(EMPTY_IMAGE_OPENED, (_event, files) => {
  console.log(files);
  emptyImage.src = files[0];
});

ipcRenderer.on(BORDER_IMAGE_OPENED, (_event, files) => {
  console.log(files);
  borderImage.src = files[0];
});

generateBtn.addEventListener('click', () => {
  const resultCtx = new advancedCtx(resultCanvas, emptyImage, borderImage);

  resultCtx.makeImages();
});
