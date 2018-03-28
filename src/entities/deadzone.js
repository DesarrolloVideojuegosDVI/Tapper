var DeadZone = function(x,y){
	this.setup("DeadZone",{vx: 0});
	this.x = x + this.w/2;
  	this.y = y;
};
DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;

DeadZone.prototype.step = function(){};
