const { ipcRenderer } = require('electron');
const { advancedCtx } = require('../../utils/canvasTools');
const {
  FILE_SELECT_EMPTY_BUTTON,
  FILE_SELECT_BORDER_BUTTON,
  EMPTY_IMAGE_OPENED,
  BORDER_IMAGE_OPENED,

  TOP_LEFT_BORDER,
  LEFT_BORDER,
  BOTTOM_RIGHT_BORDER,
  BOTTOM_BORDER,
  BOTTOM_LEFT_BORDER,
  RIGHT_BORDER,
  TOP_RIGHT_BORDER,
  TOP_BORDER,
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

ipcRenderer.on(EMPTY_IMAGE_OPENED, (event, files) => {
  console.log(files);
  emptyImage.src = files[0];
});

ipcRenderer.on(BORDER_IMAGE_OPENED, (event, files) => {
  console.log(files);
  borderImage.src = files[0];
});

let i = 0;

generateBtn.addEventListener('click', () => {
  const resultCtx = new advancedCtx(resultCanvas, emptyImage, borderImage);

  resultCtx.reset();
  resultCtx.drawBorder(i);
  i++;
  if (i == 47) i = 0;
  resultCtx.saveAs('result.png');
});
