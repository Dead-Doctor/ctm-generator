const fs = require('fs');

const { ipcRenderer } = require('electron');
const { advancedCtx } = require('../libs/ctmTools');
const { ColorPicker } = require('../libs/colorPicker');
const { IDInput } = require('../libs/idInput');

const {
  FILE_SELECT_EMPTY_BUTTON,
  FILE_SELECT_BORDER_BUTTON,
  EMPTY_IMAGE_OPENED,
  BORDER_IMAGE_OPENED,
  GENERATE,
  GENERATE_OUT,
  PROPERTIES,
  PROPERTIES_META,
} = require('../libs/constants.js');

const emptyImage = document.getElementById('fileSelectEmptyPreview');

const borderImage = document.getElementById('fileSelectBorderPreview');
const borderCanvas = document.getElementById('colorSelectBorderPreview');

const colorPickerInput = document.getElementById('colorInput');
let colorSelection = false;

const generateBtn = document.getElementById('generateBtn');
const idInputField = document.getElementById('idInputField');

const resultCanvas = document.getElementById('resultCanvas');

document.getElementById('fileSelectEmptyBtn').addEventListener('click', () => {
  ipcRenderer.send(FILE_SELECT_EMPTY_BUTTON);
});
document.getElementById('fileSelectBorderBtn').addEventListener('click', () => {
  ipcRenderer.send(FILE_SELECT_BORDER_BUTTON);
});

const colorPicker = new ColorPicker(colorPickerInput, emptyImage, borderCanvas);
const idInput = new IDInput(idInputField);

ipcRenderer.on(EMPTY_IMAGE_OPENED, (_event, files) => {
  emptyImage.src = files[0];
});

ipcRenderer.on(BORDER_IMAGE_OPENED, (_event, files) => {
  borderImage.src = files[0];
  borderCanvas.classList.remove('canvas-front');
  colorSelection = false;
});

generateBtn.addEventListener('click', () => {
  ipcRenderer.send(GENERATE);
});

ipcRenderer.on(GENERATE_OUT, (_event, folder) => {
  const resultCtx = new advancedCtx(resultCanvas, emptyImage, colorSelection ? borderCanvas : borderImage);

  if (idInput.withMeta) {
    fs.writeFile(
      `${folder[0]}\\${idInput.id}_${idInput.meta}.properties`,
      PROPERTIES_META(idInput.id, idInput.meta),
      'utf8',
      (err) => {
        if (err) console.error(err);
      }
    );
  } else {
    fs.writeFile(`${folder[0]}\\${idInput.id}.properties`, PROPERTIES(idInput.id), 'utf8', (err) => {
      if (err) console.error(err);
    });
  }

  resultCtx.makeImages(folder[0]);
});
