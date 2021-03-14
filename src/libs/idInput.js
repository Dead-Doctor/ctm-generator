module.exports = {
  IDInput: class {
    constructor(input) {
      this.input = input;
      this.input.addEventListener('input', () => {
        this.correctSyntax();
      });

      this.id = 35;
      this.meta = 14;
      this.withMeta = true;
    }

    correctSyntax() {
      let firstkolon = true;
      let idDigitAmount = 0;
      let metaDigitAmount = 0;

      let pos = 0;
      let removedChars = 0;

      let resultArray = [];

      if (this.input.selectionStart || this.input.selectionStart == '0') {
        pos = this.input.selectionStart;
      }

      let valueAsArray = [...this.input.value];

      for (let i = 0; i < valueAsArray.length; i++) {
        let char = valueAsArray[i];

        //first character
        if (i == 0) {
          //is kolon
          if (this.isKolon(char)) {
            removedChars++;
            continue;
          }

          //is digit
          if (this.isDigit(char)) {
            idDigitAmount++;
            resultArray.push(char);
            continue;
          }

          removedChars++;
          continue;
        }

        //middle character
        else {
          //is kolon
          if (this.isKolon(char)) {
            if (firstkolon) {
              firstkolon = false;
              resultArray.push(char);
              continue;
            } else {
              removedChars++;
              continue;
            }
          }

          //is digit
          if (this.isDigit(char)) {
            if (firstkolon) {
              if (idDigitAmount < 4) {
                idDigitAmount++;
                resultArray.push(char);
                continue;
              } else {
                removedChars++;
                continue;
              }
            } else {
              if (metaDigitAmount < 3) {
                metaDigitAmount++;
                resultArray.push(char);
                continue;
              } else {
                removedChars++;
                continue;
              }
            }
          }

          removedChars++;
          continue;
        }
      }

      let finalValue = resultArray.join('');

      if (finalValue.indexOf(':') == -1) {
        this.id = parseInt(finalValue.split(':')[0]) || 0;
        this.withMeta = false;
      } else {
        this.id = parseInt(finalValue.split(':')[0]) || 0;
        this.meta = parseInt(finalValue.split(':')[1]) || 0;
        this.withMeta = true;
      }

      this.input.value = finalValue;

      if (this.input.setSelectionRange) {
        this.input.setSelectionRange(pos - removedChars, pos - removedChars);
      }

      // console.log(this.id + (this.withMeta ? ' | ' + this.meta : ''));
    }

    isKolon(char) {
      return char == ':';
    }

    isDigit(char) {
      return /[0-9]/.test(char);
    }
  },
};
