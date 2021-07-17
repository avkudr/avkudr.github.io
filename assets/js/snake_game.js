// Warning! Bad code below!

var xsize = 40;
var ysize = 40;
var squareSizePx = 12;

var speedIntervalMs = 100;
var directionChangeAllowed = true;

function speedReset() {
  speedIntervalMs = 100;
  clearInterval(myGameArea.interval);
  myGameArea.interval = setInterval(updateGameArea, speedIntervalMs);
}

function speedSlower() {
  speedIntervalMs *= 0.9;
  clearInterval(myGameArea.interval);
  myGameArea.interval = setInterval(updateGameArea, speedIntervalMs);
}

function speedFaster() {
  speedIntervalMs *= 1.1;
  clearInterval(myGameArea.interval);
  myGameArea.interval = setInterval(updateGameArea, speedIntervalMs);
}

const Directions = { "left": 0, "right": 1, "up": 2, "down": 3 }
Object.freeze(Directions)

var direction = Directions.left;
var newDirection = direction;

var snake, food;
function startGame() {
  snake = new Snake();
  food = new Food();
  myGameArea.start();
}

var myGameArea = {
  canvas: document.getElementById('snake_game'),
  start: function () {
    this.canvas.width = xsize * squareSizePx;
    this.canvas.height = ysize * squareSizePx;
    this.context = this.canvas.getContext("2d");
    clearInterval(this.interval);
    this.interval = setInterval(updateGameArea, speedIntervalMs);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

function SnakeElement(x, y) {
  this.x = x;
  this.y = y;

  this.draw = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = "green";
    ctx.fillRect(this.x * squareSizePx - 1, this.y * squareSizePx - 1, squareSizePx - 2, squareSizePx - 2);
  }
}

function nextBlockXY(direction, x, y) {
  switch (direction) {
    case Directions.left:
      x = (x - 1 + xsize) % xsize;
      y = y;
      break;
    case Directions.right:
      x = (x + 1) % xsize;
      y = y;
      break;
    case Directions.up:
      x = x;
      y = (y - 1 + ysize) % ysize;
      break;
    case Directions.down:
      x = x;
      y = (y + 1) % ysize;
      break;
    default:
      alert('Default case');
  }

  return [x, y];
}

function Snake() {
  this.elements = [];
  this.elements.push(new SnakeElement(5, 20));
  this.elements.push(new SnakeElement(5, 20));
  this.elements.push(new SnakeElement(5, 20));

  this.draw = function () {
    for (const x of this.elements) { x.draw(); }
  }
  this.move = function () {
    first = this.elements[0];
    last = this.elements[this.elements.length - 1];

    var newBlock = nextBlockXY(direction, last.x, last.y)
    var newBlk = new SnakeElement(newBlock[0], newBlock[1]);

    if (newBlk.x === food.x && newBlk.y === food.y) {
      do {
        food = new Food();
      } while (snake.intersects(food.x, food.y))
    }
    else {
      this.elements.shift();
    }
    this.elements.push(newBlk);
  }

  this.crossesItself = function () {
    last = this.elements[this.elements.length - 1];
    for (let i = 0; i < this.elements.length - 1; i++) {
      var tmp = this.elements[i];
      if (tmp.x === last.x && tmp.y === last.y) {
        return true;
      }
    }
    return false;
  }

  this.intersects = function (x, y) {
    last = new SnakeElement(x, y);
    for (let i = 0; i < this.elements.length; i++) {
      var tmp = this.elements[i];
      if (tmp.x === last.x && tmp.y === last.y) {
        return true;
      }
    }
    return false;
  }
}

function Food() {
  this.x = Math.floor(Math.random() * xsize);
  this.y = Math.floor(Math.random() * ysize);

  this.draw = function () {
    ctx = myGameArea.context;
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * squareSizePx - 1, this.y * squareSizePx - 1, squareSizePx - 2, squareSizePx - 2);
  }
}

window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;

  if (code === 72 && direction !== Directions.right) {// h
    newDirection = Directions.left;
  }
  else if (code === 74 && direction !== Directions.up) {// j
    newDirection = Directions.down;
  }
  else if (code === 75 && direction !== Directions.down) {// k
    newDirection = Directions.up;
  }
  else if (code === 76 && direction !== Directions.left) {// l
    newDirection = Directions.right;
  }
  else if (e.key === "+") {
    speedSlower();
  }
  else if (e.key === "0") {
    speedReset();
  }
  else if (e.key === "-") {
    speedFaster();
  }
};

function updateGameArea() {
  myGameArea.clear();

  direction = newDirection;
  snake.move();
  if (snake.crossesItself()) {
    startGame();
    return;
  }

  snake.draw();
  food.draw();
  myGameArea.context.fillStyle = "black";
  myGameArea.context.font = "18px Arial";
  myGameArea.context.fillText("Score: " + (snake.elements.length - 3), 15, 25);

  // making sure that the direction is not changed more than one time per frame
  
}