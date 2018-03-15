var Beer = function(x,y) {
  this.setup('Beer', { vx: -70 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};
Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;
Beer.prototype.step = function(dt){
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_DEADZONE);
  if(collision) {
    this.board.remove(this);
    loseGame();
  }
};
