var Beer = function(x,y) {
  this.setup('Beer',{ vx: -70, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};
Beer.prototype = new Sprite();
Beer.prototype.type = OBJECT_BEER;
Beer.prototype.step = function(dt){
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_CLIENT);
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.x < -this.w) {
      this.board.remove(this);
  }
};

var EmptyBeer = function(x,y) {
  this.setup('enemy_missile',{ vy: 200, damage: 10 });
  this.x = x - this.w/2;
  this.y = y;
};
EmptyBeer.prototype = new Sprite();
EmptyBeer.prototype.type = OBJECT_EMPTY_BEER;
EmptyBeer.prototype.step = function(dt)  {
  this.y += this.vy * dt;
  var collision = this.board.collide(this,OBJECT_PLAYER)
  if(collision) {
    collision.hit(this.damage);
    this.board.remove(this);
  } else if(this.y > Game.height) {
      this.board.remove(this);
  }
};
