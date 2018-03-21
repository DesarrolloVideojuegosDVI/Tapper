var DeadZone = function(x,y){
	this.setup();
	this.x = x;
	this.y = y;
};
DeadZone.prototype = new Sprite();
DeadZone.prototype.type = OBJECT_DEADZONE;
