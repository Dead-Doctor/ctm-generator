module.exports = {
  ColorPicker: class {
    constructor(colorInput, emptyImage, borderCanvas) {
      this.colorInputElm = colorInput;
      this.colorInputElm.addEventListener('input', () => {
        this.colorChanged(this.colorInputElm.value);
      });

      this.emptyImage = emptyImage;
      this.borderCtx = borderCanvas.getContext('2d');
    }

    colorChanged(color) {
      this.borderCtx.fillStyle = color;
      this.borderCtx.fillRect(0, 0, 16, 16);
      this.borderCtx.drawImage(this.emptyImage, 1, 1, 14, 14, 1, 1, 14, 14);
      this.borderCanvasSelected();
    }

    borderCanvasSelected() {
      borderCanvas.classList.add('canvas-front');
      colorSelection = true;
    }
  },
};
