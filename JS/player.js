function Player(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.hp = options.hp;
	this.alive = options.alive;
	this.oldX = this.xPos;
	this.oldY = this.yPos;
}

Player.prototype.getX = function(){
	return this.xPos;
}

Player.prototype.getY = function(){
	return this.yPos;
}

Player.prototype.goldX = function(){
	return this.oldX;
}

Player.prototype.goldY = function(){
	return this.oldY;
}
Player.prototype.setX = function(newX){
	this.oldX = this.xPos;
	this.oldY = this.yPos;
	this.xPos = newX;
}
Player.prototype.setY = function(newY){
	this.oldY = this.yPos;
	this.oldX = this.xPos;
	this.yPos = newY;
}

Player.prototype.update = function(){

	switch (lastKeyPressed){
		case 65: //a
			return 'left';
			break;
		case 68: //d
			return 'right';
			break;
		case 83: //s
			return 'down';
			break;
		case 87: //w
			return 'up';
			break;
		default:
			return 'none';
	}
	return 'none';
}
