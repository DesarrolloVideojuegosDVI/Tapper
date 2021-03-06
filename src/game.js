var sprites = {
  Beer: {sx: 512, sy: 99, w: 23, h: 32, frames: 1},
  Glass: {sx: 512, sy: 131, w: 23, h: 32, frames: 1},
  NPC: {sx: 512, sy: 66, w: 33, h: 33, frames: 1},
  ParedIzda: {sx: 0, sy: 0, w: 512, h: 480, frames: 1},
  Player: {sx: 512, sy: 0, w: 56, h: 66, frames: 1},
  TapperGameplay: {sx: 0, sy: 480, w: 512, h: 480, frames: 1},
  DeadZone:{w: 23, h:32}
};

var deadZones = [
  { x: 68, y: 90 },
  { x: 30, y: 185 },
  { x: 3, y: 281 },
  { x: -30, y: 377 },
  { x: 325, y: 90 },
  { x: 357, y: 185 },
  { x: 389, y: 281 },
  { x: 421, y: 377 }
];

var OBJECT_PLAYER = 1,
    OBJECT_BEER = 2,
    OBJECT_CLIENT = 4,
    OBJECT_GLASS = 8,
    OBJECT_DEADZONE = 16;

var posiciones = {
  barra0: {x: 325, y: 90},
  barra1: {x: 357, y: 185},
  barra2: {x: 389, y: 281},
  barra3: {x: 421, y: 377}
};

var spawners = [
  // Frecuencia y retardo en segundos.
  { barra: posiciones.barra0, numCLientes: 1, frecuencia: 1, retardo: 0},
  { barra: posiciones.barra1, numCLientes: 0, frecuencia: 1, retardo: 5},
  { barra: posiciones.barra2, numCLientes: 0, frecuencia: 1, retardo: 7},
  { barra: posiciones.barra3, numCLientes: 1, frecuencia: 1, retardo: 10}
]

var GameManager = new function(){
  this.estado = 0; //Indica si el juego esta corriendo (0), si se ha perdido (1) o si se ha ganado (2)
  this.numClientesTotales = 0;
  this.numClientesEsperando = 0;
  this.numClientesServidos = 0;
  this.jarrasLlenas = 0;
  this.jarrasVacias = 0;

  this.inicializar = function(numClientes){
    this.numClientesTotales += numClientes;
  }

  this.actualiza = function(tipo, operacion){
    var num = 0;
    if(operacion === "+")
      num = 1;
    else if(operacion === "-")
      num = -1;
    switch(tipo){
      case "numClientesEsperando":
        this.numClientesEsperando += num;
        break;
      case "numClientesServidos":
        this.numClientesServidos += num;
        break;
      case "jarrasLlenas":
        this.jarrasLlenas += num;
        break;
      case "jarrasVacias":
        this.jarrasVacias += num;
        break;

      default:
        break;
    }
  };

  this.step = function(){
    if(this.numClientesTotales > 1 && this.numClientesServidos === this.numClientesTotales
      && this.numClientesEsperando <= 0 && this.jarrasLlenas <= 0 && this.jarrasVacias <= 0){
      this.estado = 2;
    }
      switch(this.estado){
        case 1:
          loseGame();
          break;
        case 2:
          winGame();
          break;
      }
  }

  this.draw = function(){};

  this.reset = function() {
    this.estado = 0;
    this.numClientesTotales = 0;
    this.numClientesEsperando = 0;
    this.numClientesServidos = 0;
    this.jarrasLlenas = 0;
    this.jarrasVacias = 0;
  };
};

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
  makeSpawners(board, spawners);
  Game.setBoard(1, board);
  Game.setBoard(4, new SemiBackground());
  Game.setBoard(5, new GamePoints(0));
  makeDeadZones(board, deadZones);
};

var winGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  GameManager.reset();
  Game.setBoard(0, new Background());
  Game.setBoard(1, new TitleScreen("You win!",
                                  "Press space to play again",
                                  this.playGame));
};

var loseGame = function() {
  var ua = navigator.userAgent.toLowerCase();

  GameManager.reset();
  Game.setBoard(0, new Background());
  Game.setBoard(1, new TitleScreen("You lose!",
                                  "Press space to play again",
                                  this.playGame));
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

var makeDeadZones = function(board, deadZones){
  deadZones.forEach(function(deadZone) {
    board.add(new DeadZone(deadZone.x, deadZone.y));
  });
}

var makeSpawners = function(board, spawners){
  spawners.forEach(function(spawner) {
    board.add(new Spawner(spawner.barra, spawner.numCLientes, spawner.frecuencia, spawner.retardo));
  });
}
