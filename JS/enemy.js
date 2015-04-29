function Enemy(options){
	this.xPos = options.xPos;
	this.yPos = options.yPos;
	this.hp = options.hp;
	this.alive = options.alive;
	this.oldX = this.xPos;
	this.oldY = this.yPos;
}

Enemy.prototype.getX = function(){
	return this.xPos;
}

Enemy.prototype.getY = function(){
	return this.yPos;
}

Enemy.prototype.goldX = function(){
	return this.oldX;
}

Enemy.prototype.goldY = function(){
	return this.oldY;
}
Enemy.prototype.setX = function(newX){
	this.oldX = this.xPos;
	this.oldY = this.yPos;
	this.xPos = newX;
}
Enemy.prototype.setY = function(newY){
	this.oldY = this.yPos;
	this.oldX = this.xPos;
	this.yPos = newY;
}


Enemy.prototype.render = function(options){
	context.drawImage( 
		images.enemy,
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