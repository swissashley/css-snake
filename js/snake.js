function Snake ($el) {
  this.$el = $el;
  this.direction = [0,-1];
  this.segments = [[5,9]];
  this.head = this.segments[0];
  this.MOVES = {
    "up": [ 0, -1],
    "left": [-1,  0],
    "down": [ 0,  1],
    "right": [ 1,  0],
  };
  this.turnListener();
}

Snake.prototype.move = function(){
  let pos = this.segments[0];
  this.segments.pop();
  let posX = pos[0] + this.direction[0];
  let posY = pos[1] + this.direction[1];
  this.segments.unshift([posX,posY]);
  this.head = this.segments[0];
};

Snake.prototype.isCrash = function () {
  if (this.head[0] === -1 || this.head[1] === -1 || this.head[0] === 10 || this.head[0] === 10) {
    return true;
  } else if (this.segments.slice(1).includes(this.head)) {
    return true;
  }
  return false;
};

Snake.prototype.turnListener = function() {
  Object.keys(this.MOVES).forEach((k) => {
    let nextMove = this.MOVES[k];
    key(k, () => {
      if (!this.isOpposite(nextMove)) {
        this.direction = nextMove;
      }
      console.log("Pressing!!" + nextMove);
    });
  });
};



Snake.prototype.plus = function(){
  let newSeg = this.segments[this.segments.length-1];
  this.segments.push(newSeg);
  this.segments.push(newSeg);
};

Snake.prototype.isOpposite = function (newDir) {
  if (newDir[0] + this.direction[0] === 0 ||
    newDir[1] + this.direction[1] === 0) {
    return true;
  }
  return false;
};

function Board() {
  this.snake = new Snake();
  this.apple = [5,5];
}

Board.prototype.eat = function () {
  if (this.snake.head[0] === this.apple[0] &&
    this.snake.head[1] === this.apple[1]) {
    this.snake.plus();
    let overlapped = true;
    while (overlapped) {
      this.apple = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
      console.log(this.apple);
      if (!this.snake.segments.includes(this.apple)) {
        overlapped = false;
      }
    }
  }
};
module.exports = Board;
