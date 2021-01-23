export const direction_handler = {
  "top": function() {
    return [this.row - 1, this.col];
  },
  "bottom": function() {
    return [this.row + 1, this.col];
  },
  "left": function() {
    return [this.row, this.col - 1];
  },
  "right": function() {
    return [this.row, this.col + 1];
  },
  "top-left": function() {
    return [this.row - 1, this.col - 1];
  },
  "top-right": function() {
    return [this.row - 1, this.col + 1];
  },
  "bottom-left": function() {
    return [this.row + 1, this.col - 1];
  },
  "bottom-right": function() {
    return [this.row + 1, this.col + 1];
  }
}

export default class {
  constructor(row, col) {
    this.row = row;
    this.col = col;

    this.isFilled = false;
    this.isWhite = false;

    /*
    this.isFilled = true;

    const isBlack = Math.floor(Math.random() * 10 ) % 2
    this.isBlack = isBlack;
    this.isWhite = !isBlack;
    */
  }

  getDirectionIndex(direction) {
    const handler = direction_handler[direction];
    if (!handler) {
      return null;
    }

    return handler.call(this);
  }
}