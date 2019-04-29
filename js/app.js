let Deffeculty = 1;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.yRandom = [50, 130, 210];
    this.x = Math.floor(Math.random() * -300 - 50);
    this.y = this.yRandom [Math.floor(Math.random() * this.yRandom.length)];
    this.speed = Math.floor((Math.random() * 85) + 25 * document.querySelector('.level span').innerHTML);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //Updates the Enemy location (you need to implement):
    if (this.x > 540){
      this.x = -90;
    }
    //Handles collision with the Player (you need to implement):
    // The player has four sides we have to check them for collisions with if statment:
    if (player.x < this.x + 50 && //check on the right side of the player
        player.x + 27 > this.x && //check on the left side of the player
        player.y < this.y + 15 && //check on the front side of the player
        player.y+ 20 > this.y)    //check on the back side of the player
        {
      player.x = 0; //if collision happen return to zero x.
      player.y = 500; //if collision happen return to 500 y.
      Deffeculty--; // decrement the deffecalty level by 1.
      // change the number in the page.
      document.querySelector('.level span').innerHTML= `${Deffeculty}`;

    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// player function:
let Player = function(xAxis, yAxis, pSpeed){
  this.x = xAxis;
  this.y = yAxis;
  this.speed = pSpeed;
  this.sprite = 'images/char-boy.png';
};
//update method for the player:
Player.prototype.update = function() {
  //checking the boundaries of the canves:
  // using if statment to check each boundary:
  //we will chech only the lower y boundary:
    if (this.y > 400) {
      this.y = 400;
    }
    //for x we will check the  two sides right and left:
    // right side.
    if (this.x > 420) {
      this.x = 420;
    }
    //left side.
    if (this.x < 0) {
      this.x = 0;
    }
    // Here we will check the upper y boundary for wining condition:
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        Deffeculty++;
        document.querySelector('.level span').innerHTML= `${Deffeculty}`;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
  if(keyPress === 'up'){
    this.y -= 90;
  }
  else if (keyPress === 'right'){
    this.x += 100;
  }
  else if (keyPress === 'down'){
    this.y += 90;
  }
  else if (keyPress === 'left'){
    this.x -= 100;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(), new Enemy(), new Enemy()];
var player = new Player(200, 380);


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
