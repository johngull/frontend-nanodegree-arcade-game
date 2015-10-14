// Base class for Enemies and player
var Actor = function(x, y) {
    this.x = x;
    this.y = y;
};

Actor.prototype.movePosition = function(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy;
};

Actor.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

Actor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function() {
    Actor.call(this, 0, 0);

    this.speed = 100;
    this.resetPositionAndSpeed();

    //random place on start for nice start
    this.setPosition(Math.floor(Math.random()*101*6-101), this.y);

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype = Object.create(Actor.prototype);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.movePosition(this.speed*dt, 0);
    if(this.x>5*101)
        this.resetPositionAndSpeed();
};

Enemy.prototype.resetPositionAndSpeed = function() {
    col = -1;
    row = Math.floor(Math.random()*3+1);
    this.setPosition(col*101, row*83);
    this.speed = Math.floor(Math.random()*500+50);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row, col) {
    Actor.call(this, col*101, row*83);

    this.row = row;
    this.col = col;
    this.direction = "none";
    this.sprite = "images/char-boy.png";
};

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function(/*dt*/) {
    switch(this.direction) {
        case "left":
            this.col = this.col-1;
            break;
        case "up":
            this.row = this.row-1;
            break;
        case "right":
            this.col = this.col+1;
            break;
        case "down":
            this.row = this.row+1;
            break;
        default:
            break;
    }
    this.direction = "none";

    if(this.row<0)
        this.row = 0;
    if(this.row>5)
        this.row = 5;
    if(this.col<0)
        this.col = 0;
    if(this.col>4)
        this.col = 4;

    this.setPosition(this.col*101, this.row*83);
};

Player.prototype.handleInput = function(direction) {
  this.direction = direction;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    var player = new Player(5,2);
    var allEnemies = [];
    for(i=0;i<3;i++)
        allEnemies.push(new Enemy());



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
