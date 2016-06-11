// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.resetX();
    this.resetY();
    this.resetSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.speed;

    if ( this.x > 505 ) {
        this.resetX();
        this.resetY();
        this.resetSpeed();
    }

    var enemyLeft = this.x;
    var enemyRight = this.x + 80;
    var playerLeft = player.x;
    var playerRight = player.x + 80;

    var enemyTop = this.y;
    var enemyBottom = this.y + 40;
    var playerTop = player.y;
    var playerBottom = player.y + 40;

    if ( enemyRight >= playerLeft && enemyLeft <= playerRight) {
        if (enemyBottom >= playerTop && enemyTop <= playerBottom) {
            player.resetX();
            player.resetY();
        }
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.resetX = function() {
    this.x = -100;
    return this;
};

Enemy.prototype.resetY = function() {
    this.y = Math.floor((Math.random() * 3) + 1) * 83 - 30;
    return this;
};

Enemy.prototype.resetSpeed = function() {
    this.speed = Math.floor((Math.random() * 10) + 1) * 40;
    return this;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.resetX();
    this.resetY();
};

Player.prototype.update = function(dt) {
    if ( this.y < 40 ) {
        this.resetX();
        this.resetY();
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if ( this.x - 101 >= 0 ) this.x -= 101;
            break;
        case 'up':
            if ( this.y - 83 > -83 ) this.y -= 83;
            break;
        case 'right':
            if ( this.x + 101 < 505 ) this.x += 101;
            break;
        case 'down':
            if ( this.y + 83 < 458 ) this.y += 83;
            break;

    }
};

Player.prototype.resetX = function() {
    this.x = 202;
    return this;
};

Player.prototype.resetY = function() {
    this.y = 5*83-40;
    return this;
};


var Selector = function() {
    this.sprite = 'images/Selector.png';
    this.resetX();
    this.resetY();
};

Selector.prototype.update = function(dt) {
    if ( this.y < 40 ) {
        this.resetX();
        this.resetY();
    }
};

Selector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Selector.prototype.handleInput = function(key) {
    switch (key) {
        case 'left':
            if ( this.x - 101 >= 0 ) this.x -= 101;
            break;
        case 'right':
            if ( this.x + 101 < 500 ) this.x += 101;
            break;
        case 'space':
            player.sprite = rowCharacters[this.x/101];
            gameState = 1;
            break;
    }
};

Selector.prototype.resetX = function() {
    this.x = 202;
    return this;
};

Selector.prototype.resetY = function() {
    this.y = 2*83-40;
    return this;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var e1 = new Enemy();
var e2 = new Enemy();
var e3 = new Enemy();

var allEnemies = [e1,e2,e3];
// Place the player object in a variable called player
var player = new Player();

var selector = new Selector();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'

    };

    if ( gameState == 0 ) {
        selector.handleInput(allowedKeys[e.keyCode]);
    } else {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});
