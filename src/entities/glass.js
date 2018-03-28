var Glass = function(x,y) {
  this.setup('Glass',{ vx: 70, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};
Glass.prototype = new Sprite();
Glass.prototype.type = OBJECT_GLASS;
Glass.prototype.step = function(dt)  {
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    GameManager.actualiza("jarrasVacias", "-");
    this.board.remove(this);
  //} else if(this.x > Game.height) {
  }else if(this.board.collide(this,OBJECT_DEADZONE)){
    this.board.remove(this);
    GameManager.estado = 1;
  }
};
