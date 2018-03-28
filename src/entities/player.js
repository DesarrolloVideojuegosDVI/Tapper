var Player = function() {
  this.setup('Player', { vx: 0, reloadTime: 0.25, maxVel: 200 });

  this.reload = this.reloadTime;
  this.x = posiciones.barra3.x;
  this.y = posiciones.barra3.y;
  this.cadencia = this.reloadTime;

  this.step = function(dt) {
    var posicionSiguiente = {x: this.x, y: this.y};
    this.cadencia -= dt;
    if(Game.keys['up'] && this.cadencia < 0){
      Game.keys['up'] = false;
      if(this.x === posiciones.barra0.x){
        posicionSiguiente = posiciones.barra3;
      }else if(this.x === posiciones.barra1.x){
        posicionSiguiente = posiciones.barra0;
      }else if(this.x === posiciones.barra2.x){
        posicionSiguiente = posiciones.barra1;
      }else if(this.x === posiciones.barra3.x){
        posicionSiguiente = posiciones.barra2;
      }
      this.cadencia = this.reloadTime;
    }else if(Game.keys['down'] && this.cadencia < 0){
      Game.keys['down'] = false;
      if(this.x === posiciones.barra0.x){
        posicionSiguiente = posiciones.barra1;
      }else if(this.x === posiciones.barra1.x){
        posicionSiguiente = posiciones.barra2;
      }else if(this.x === posiciones.barra2.x){
        posicionSiguiente = posiciones.barra3;
      }else if(this.x === posiciones.barra3.x){
        posicionSiguiente = posiciones.barra0;
      }
      this.cadencia = this.reloadTime;
    }

    this.x = posicionSiguiente.x;
    this.y = posicionSiguiente.y;
    this.reload-=dt;
    if(Game.keys['fire'] && this.reload < 0) {
      Game.keys['fire'] = false;
      this.reload = this.reloadTime;
      GameManager.actualiza("jarrasLlenas", "+");
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
