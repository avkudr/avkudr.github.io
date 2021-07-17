// function draw() {
//   var canvas = document.getElementById('snake_game');
//   if (canvas.getContext) {
//     var ctx = canvas.getContext('2d');

//     ctx.fillStyle = 'rgb(200, 0, 0)';
//     ctx.fillRect(10, 10, 50, 50);

//     ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
//     ctx.fillRect(30, 30, 50, 50);
//   }
// }

var xsize = 40;
var ysize = 40;
var squareSizePx = 10;

var speedIntervalMs = 100;

var direction = 0;

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
    ctx.fillRect(this.x * squareSizePx, this.y * squareSizePx, squareSizePx, squareSizePx);
  }
}

function nextBlockXY(direction, x, y) 
{
  switch (direction) {
    case 0: // left
      x = (x - 1 + xsize) % xsize;
      y = y;
      break;
    case 1: // right
      x = (x + 1) % xsize;
      y = y;
      break;
    case 2: // up
      x = x;
      y = (y - 1 + ysize) % ysize;
      break;
    case 3: // down
      x = x;
      y = (y + 1) % ysize;
      break;
    default:
      alert('Default case');
  }

  return [x,y];
}

function Snake() {
  this.elements = [];
  this.elements.push(new SnakeElement(5, 0));
  this.elements.push(new SnakeElement(5, 0));
  this.elements.push(new SnakeElement(5, 0));

  this.draw = function () {
    for (const x of this.elements) { x.draw(); }
  }
  this.move = function () {
    first = this.elements[0];
    last = this.elements[this.elements.length - 1];

    var newBlock = nextBlockXY(direction,last.x,last.y)
    var newBlk = new SnakeElement(newBlock[0],newBlock[1]);

    if (newBlk.x === food.x && newBlk.y === food.y) 
    {
      do{
        food = new Food();
      }while(snake.intersects(food.x,food.y))
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

  this.intersects = function (x,y) {
    last = new SnakeElement(x,y);
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
    ctx.fillRect(this.x * squareSizePx, this.y * squareSizePx, squareSizePx, squareSizePx);
  }
}

function updateGameArea() {
  myGameArea.clear();
  snake.move();
  if (snake.crossesItself()) 
  {
    startGame();
    return;
  }
    
  snake.draw();
  food.draw();
}

window.onkeydown = function (e) {
  var code = e.keyCode ? e.keyCode : e.which;
  
  if (code === 72) // h
    direction = 0;
  else if (code === 74) // j
    direction = 3;
  else if (code === 75) // k
    direction = 2;
  else if (code === 76) // l
    direction = 1;
};