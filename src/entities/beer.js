var Beer = function(x,y) {
  this.setup('Beer',{ vx: -70, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};
Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_PLAYER_PROJECTILE;
Beer.prototype.step = function(dt){
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_ENEMY);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.x < -this.w) {
      this.board.remove(this);
  }
};
