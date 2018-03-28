var Client = function(x, y) {
  this.setup('NPC', { vx: 70 });
  this.x = x;
  this.y = y;
};

Client.prototype = new Sprite();
Client.prototype.type = OBJECT_CLIENT;
Client.prototype.step = function(dt) {
  var haPasado = false;
  this.x += this.vx * dt;
  var collision = this.board.collide(this,OBJECT_BEER);
  if(collision) {
    GameManager.actualiza("numClientesServidos", "+");
    GameManager.actualiza("numClientesEsperando", "-");
    GameManager.actualiza("jarrasLlenas", "-");
    GameManager.actualiza("jarrasVacias", "+");
    this.board.add(new Glass(this.x+23*2,this.y+42));
    //this.vx = -70;
    this.board.remove(this);
    this.board.remove(collision);
  }else if(this.board.collide(this,OBJECT_DEADZONE)){
    if(this.x > 256){
      this.board.remove(this);
      GameManager.estado = 1;
    }

  }
};
