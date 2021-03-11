const fs = require('fs');
const { BORDERS } = require('./constants');

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

    drawBorderPiece(border) {
      switch (border) {
        case 0:
          this.ctx.drawImage(this.borderImg, 0, 0, 1, 1, 0, 0, 1, 1);
          break;
        case 1:
          this.ctx.drawImage(this.borderImg, 0, 1, 1, 14, 0, 1, 1, 14);
          break;
        case 2:
          this.ctx.drawImage(this.borderImg, 0, 15, 1, 1, 0, 15, 1, 1);
          break;
        case 3:
          this.ctx.drawImage(this.borderImg, 1, 15, 14, 1, 1, 15, 14, 1);
          break;
        case 4:
          this.ctx.drawImage(this.borderImg, 15, 15, 1, 1, 15, 15, 1, 1);
          break;
        case 5:
          this.ctx.drawImage(this.borderImg, 15, 1, 1, 14, 15, 1, 1, 14);
          break;
        case 6:
          this.ctx.drawImage(this.borderImg, 15, 0, 1, 1, 15, 0, 1, 1);
          break;
        case 7:
          this.ctx.drawImage(this.borderImg, 1, 0, 14, 1, 1, 0, 14, 1);
          break;
      }
    }

    makeImages() {
      BORDERS.forEach((borderTiles, i) => {
        this.reset();
        borderTiles.forEach((e, j) => {
          if (e) {
            this.drawBorderPiece(j);
          }
        });
        this.saveAs(i);
      });
    }

    saveAs(name) {
      const url = this.canvas.toDataURL('image/png');

      const base64Data = url.replace(/^data:image\/png;base64,/, '');
      fs.writeFile('out/' + name + '.png', base64Data, 'base64', (err) => {
        if (err) console.error(err);
      });
    }
  },
};
