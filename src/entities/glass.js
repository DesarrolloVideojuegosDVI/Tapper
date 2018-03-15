var Glass = function(x,y) {
  this.setup('Glass',{ vx: 70, damage: 10 });
  this.x = x - this.w/2;
  this.y = this.h;
};
Glass.prototype = new Sprite();
Glass.prototype.type = OBJECT_GLASS;
Glass.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    this.board.remove(this);
  } else if(this.y > Game.height) {
    this.board.remove(this);
  }
};
