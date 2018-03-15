var Player = function() {
  this.setup('Player', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = posiciones.abajo.x;
  this.y = posiciones.abajo.y;
  this.cadencia = this.reloadTime;

  this.step = function(dt) {
    var posicionSiguiente = {x: this.x, y: this.y};
    this.cadencia -= dt;
    if(Game.keys['up'] && this.cadencia < 0){
      Game.keys['up'] = false;
      if(this.x === posiciones.arriba.x){
        posicionSiguiente = posiciones.abajo;
      }else if(this.x === posiciones.medioArriba.x){
        posicionSiguiente = posiciones.arriba;
      }else if(this.x === posiciones.medioAbajo.x){
        posicionSiguiente = posiciones.medioArriba;
      }else if(this.x === posiciones.abajo.x){
        posicionSiguiente = posiciones.medioAbajo;
      }
      this.cadencia = this.reloadTime;
    }else if(Game.keys['down'] && this.cadencia < 0){
      Game.keys['down'] = false;
      if(this.x === posiciones.arriba.x){
        posicionSiguiente = posiciones.medioArriba;
      }else if(this.x === posiciones.medioArriba.x){
        posicionSiguiente = posiciones.medioAbajo;
      }else if(this.x === posiciones.medioAbajo.x){
        posicionSiguiente = posiciones.abajo;
      }else if(this.x === posiciones.abajo.x){
        posicionSiguiente = posiciones.arriba;
      }
      this.cadencia = this.reloadTime;
    }

    this.x = posicionSiguiente.x;
    this.y = posicionSiguiente.y;
    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;

      this.board.add(new Beer(this.x,this.y+this.h/2));
    }
  };

};
Player.prototype = new Sprite();
Player.prototype.type = OBJECT_PLAYER;
Player.prototype.hit = function(damage) {
  if(this.board.remove(this)) {
    loseGame();
  }
};
