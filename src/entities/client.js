var Client = function(x, y) {
  this.setup('NPC', { vx: 70, damage: 10 });
  this.x = x - this.w/2;
  this.y = y - this.h;
};
Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;
Client.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0,
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75,
                                   reload: 0 };
Client.prototype.step = function(dt) {
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_BEER);
  if(collision) {
    this.board.add(new Glass(this.x,this.y+this.h/2));
    this.vx = -70;
  } else if(this.x < -this.w) {
    this.board.remove(this);
  }
};
Client.prototype.hit = function(damage) {
  this.health -= damage;
  if(this.health <=0) {
    if(this.board.remove(this)) {
      Game.points += this.points || 100;
      this.board.add(new Explosion(this.x + this.w/2,
                                   this.y + this.h/2));
    }
  }
};
