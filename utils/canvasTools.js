const sys = require('sys');
const fs = require('fs');

module.exports = {
  advancedCtx: class {
    constructor(canvas, emptyImg, borderImg) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.emptyImg = emptyImg;
      this.borderImg = borderImg;
    }

    reset() {
      this.ctx.drawImage(this.emptyImg, 0, 0);
    }

    drawBorder(borderType) {
      switch (borderType) {
        case TOP_LEFT_BORDER:
          this.ctx.drawImage(this.borderImg, 0, 0, 1, 1, 0, 0, 1, 1);
          break;
        case LEFT_BORDER:
          this.ctx.drawImage(this.borderImg, 0, 1, 1, 14, 0, 1, 1, 14);
          break;
        case BOTTOM_LEFT_BORDER:
          this.ctx.drawImage(this.borderImg, 0, 15, 1, 1, 0, 15, 1, 1);
          break;
        case BOTTOM_BORDER:
          this.ctx.drawImage(this.borderImg, 1, 15, 14, 1, 1, 15, 14, 1);
          break;
        case BOTTOM_RIGHT_BORDER:
          this.ctx.drawImage(this.borderImg, 15, 15, 1, 1, 15, 15, 1, 1);
          break;
        case RIGHT_BORDER:
          this.ctx.drawImage(this.borderImg, 15, 1, 1, 14, 15, 1, 1, 14);
          break;
        case TOP_RIGHT_BORDER:
          this.ctx.drawImage(this.borderImg, 15, 0, 1, 1, 15, 0, 1, 1);
          break;
        case TOP_BORDER:
          this.ctx.drawImage(this.borderImg, 1, 0, 14, 1, 1, 0, 14, 1);
          break;
      }
    }

    saveAs(name) {
      const url = this.canvas.toDataURL('image/png');

      const base64Data = url.replace(/^data:image\/png;base64,/, '');
      fs.writeFile('test/' + name, base64Data, 'base64', (err) => {
        if (err) console.error(err);
      });
    }
  },
};
