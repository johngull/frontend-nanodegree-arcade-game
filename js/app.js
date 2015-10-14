// Base class for Enemies and player
var Actor = function(x, y) {
    this.x = x;
    this.y = y;
};

Actor.prototype.movePosition = function(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy;
};

Actor.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Enemies our player must avoid
var Enemy = function(row, col) {
    Actor.call(this, col*101, row*83);

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
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(row, col) {
    Actor.call(this, col*101, row*83);
    this.sprite = "images/char-boy.png";
};

Player.prototype = Object.create(Actor.prototype);

Player.prototype.update = function(dt) {

};

Player.prototype.handleInput = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    var allEnemies = [new Enemy(1,0)];
    var player = new Player(5,2);


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
