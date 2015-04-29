function Tile(options){
	this.tileWidth = TILE_WIDTH;
	this.tileHeight = TILE_HEIGHT;
	
	this.tileX = options.xValue;
	this.tileY = options.yValue;
	this.tileType = options.tileType;
	this.contains = [];
}

Tile.prototype.addEntity = function(entity){
	//maybe make everything get an ID, no more than one ID anywhere?
	this.contains.push(entity);
}

Tile.prototype.removeEntity = function(entity){
	var entityToRemove = this.contains.indexOf(entity);

	if (entityToRemove > -1) {
    	this.contains.splice(entityToRemove, 1);
	}
}


Tile.prototype.hasEntity = function(){
	if ((this.contains).length >= 1){
		return true;
	}
	return false;
}


Tile.prototype.render = function(options){
	context.drawImage( 
		this.getTileValueAsImage(),
		0,
		0,
		TILE_WIDTH,
		TILE_WIDTH,
		TILE_WIDTH * options.offSetX, //position x, offSet is a precalculated pixel amount
		TILE_WIDTH * options.offSetY, //position y
		TILE_WIDTH * 1, //scale x
		TILE_WIDTH * 1  //scale y
	);	
	
	//render any contained entities
	if (this.contains.length > 0)
	{
		for (var i = 0; i < this.contains.length; i++)
		{
			this.contains[i].render({
				xCoord: TILE_WIDTH * options.offSetX,
				yCoord: TILE_HEIGHT * options.offSetY
			});
		}
	}
}

Tile.prototype.getTileValueAsImage = function(){
	switch( this.tileType ){ //a stored integer value
		case 1:
			return images.sand;
			break;
		case 2:
			return images.dirt;
			break;
		case 3:
			return images.stone;
			break;
		default:
			return images.black;
	}
}
