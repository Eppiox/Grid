function rectange(options){
	this.startX = options.startX;
	this.startX = options.startY;
	this.widthX = options.widthX;
	this.heightY = options.heightX;
}
rectange.prototype.getRect = function(){
	return this;
}

function sprite(options){
	this.currentFrame = 0;
	this.widthX = options.widthX;
	this.heightY = options.heightY;
	this.posX = options.posX;
	this.posY = options.posY;
	this.totalFrames = options.totalFrames;
	this.image = options.image;
	this.scale = options.scale;
}

sprite.prototype.render = function(){
	context.drawImage( images.knight,
		this.widthX * this.currentFrame,
		0,
		this.widthX,
		this.heightY,
		this.posX,
		this.posY,
		this.widthX * this.scale,
		this.heightY * this.scale );
}

sprite.prototype.update = function(){
	this.currentFrame++;
	this.posX += 8;

	if (this.currentFrame > this.totalFrames){
		this.currentFrame = 0;
	}

	if (this.posX > canvas.width)
		this.posX = -100;
}
