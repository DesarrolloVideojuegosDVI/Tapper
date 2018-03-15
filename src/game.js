var sprites = {
  Beer: {sx: 512, sy: 99, w: 23, h: 32, frames: 1},
  Glass: {sx: 512, sy: 131, w: 23, h: 32, frames: 1},
  NPC: {sx: 512, sy: 66, w: 33, h: 33, frames: 1},
  ParedIzda: {sx: 0, sy: 0, w: 512, h: 480, frames: 1},
  Player: {sx: 512, sy: 0, w: 56, h: 66, frames: 1},
  TapperGameplay: {sx: 0, sy: 480, w: 512, h: 480, frames: 1}
}
var enemies = {
  straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10,
              E: 100 },
  ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10,
              B: 75, C: 1, E: 100, missiles: 2  },
  circle:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10,
              A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2 },
  wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20,
              B: 50, C: 4, E: 100, firePercentage: 0.001, missiles: 2 },
  step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
              B: 150, C: 1.2, E: 75 }
};
var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_GLASS = 8,
    OBJECT_POWERUP = 16;
var posiciones = {
  arriba: {x: 325, y: 90},
  medioArriba: {x: 357, y: 185},
  medioAbajo: {x: 389, y: 281},
  abajo: {x: 421, y: 377}
};
var level1 = [
 // Start,   End, Gap,  Type,   Override
  [ 0,      4000,  500, 'step' ]
];

var startGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  Game.setBoard(0, new Background());
  Game.setBoard(1,new TitleScreen("Tapper",
                                  "Press espace to start playing",
                                  playGame));
};

var playGame = function() {
  var board = new GameBoard();
  board.add(new Player());
  board.add(new Level(level1, winGame));
  Game.setBoard(1, board);
  Game.setBoard(4, new SemiBackground());
  Game.setBoard(0, new Background());
  Game.setBoard(5, new GamePoints(0));
};

var winGame = function() {
  Game.setBoard(3, new TitleScreen("You win!",
                                  "Press fire to play again",
                                  playGame));
};

var loseGame = function() {
  Game.setBoard(3, new TitleScreen("You lose!",
                                  "Press fire to play again",
                                  playGame));
};

var Starfield = function(speed,opacity,numStars,clear) {

  // Set up the offscreen canvas
  var stars = document.createElement("canvas");
  stars.width = Game.width;
  stars.height = Game.height;
  var starCtx = stars.getContext("2d");

  var offset = 0;

  // If the clear option is set,
  // make the background black instead of transparent
  if(clear) {
    starCtx.fillStyle = "#000";
    starCtx.fillRect(0,0,stars.width,stars.height);
  }

  // Now draw a bunch of random 2 pixel
  // rectangles onto the offscreen canvas
  starCtx.fillStyle = "#FFF";
  starCtx.globalAlpha = opacity;
  for(var i=0;i<numStars;i++) {
    starCtx.fillRect(Math.floor(Math.random()*stars.width),
                     Math.floor(Math.random()*stars.height),
                     2,
                     2);
  }

  // This method is called every frame
  // to draw the starfield onto the canvas
  this.draw = function(ctx) {
    var intOffset = Math.floor(offset);
    var remaining = stars.height - intOffset;

    // Draw the top half of the starfield
    if(intOffset > 0) {
      ctx.drawImage(stars,
                0, remaining,
                stars.width, intOffset,
                0, 0,
                stars.width, intOffset);
    }

    // Draw the bottom half of the starfield
    if(remaining > 0) {
      ctx.drawImage(stars,
              0, 0,
              stars.width, remaining,
              0, intOffset,
              stars.width, remaining);
    }
  };

  // This method is called to update
  // the starfield
  this.step = function(dt) {
    offset += dt * speed;
    offset = offset % stars.height;
  };
};

var Explosion = function(centerX,centerY) {
  this.setup('explosion', { frame: 0 });
  this.x = centerX - this.w/2;
  this.y = centerY - this.h/2;
};
Explosion.prototype = new Sprite();
Explosion.prototype.step = function(dt) {
  this.frame++;
  if(this.frame >= 12) {
    this.board.remove(this);
  }
};

window.addEventListener("load", function() {
  Game.initialize("game",sprites,startGame);
});

var Background = function(){
  this.setup('TapperGameplay');
  this.x = 0;
  this.y = 0;

  this.step = function(){};

};
Background.prototype = new Sprite();

var SemiBackground = function(){
  this.setup('ParedIzda');
  this.x = 0;
  this.y = 0;

  this.step = function(){};
};
SemiBackground.prototype = new Sprite();
