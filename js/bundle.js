/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);

	$( () => {
	  const view = new View($(".snake"));
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);