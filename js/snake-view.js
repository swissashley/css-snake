const Board = require("./snake.js");

function View($el){
  this.$el = $el;
  this.board = new Board();
  this.setup();
  this.intervalId = setInterval(() => {
    this.render();
    this.step();
  }, 200);
}

View.prototype.step = function() {
  this.board.snake.move();
  if (this.board.snake.isCrash()) {
    alert("You lose!");
    window.clearInterval(this.intervalId);
  }
  this.board.eat();
};

View.prototype.setup = function () {
  const $ul = $("<ul></ul>");
  $ul.addClass("grid");
  this.$el.append($ul);
  for (var i = 0; i < 100; i++) {
    let $li = $("<li></li>");
    let y = Math.floor(i / 10);
    let x = i % 10;
    $li.data("pos", [x, y]);
    $li.addClass("tile tile"+ x + y);
    $ul.append($li);
  }
};

View.prototype.render = function(){
  let $li = $("li");
  let applePos = this.board.apple;
  $li.css("background-color", "white");

  let $apple = $(".tile"+applePos[0]+applePos[1]);
  $apple.css("background-color", "red");
  this.board.snake.segments.forEach((pos) => {
    let $currentLi = $(".tile"+pos[0]+pos[1]);
    $currentLi.css("background-color", "green");
  });

};

module.exports = View;
