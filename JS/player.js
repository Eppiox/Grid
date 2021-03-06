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


Player.prototype.render = function(options){
	context.drawImage( 
		images.player,
		0,
		0,
		TILE_WIDTH,
		TILE_WIDTH,
		options.xCoord, //position x, offSet is a precalculated pixel amount
		options.yCoord, //position y
		TILE_WIDTH * 1, //scale x
		TILE_WIDTH * 1  //scale y
	);

}