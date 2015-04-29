function TileMap(options){
	this.map = [];
	this.mapWidth = options.mapWidth;
	this.mapHeight = options.mapHeight;
	this.level = options.level;
}

TileMap.prototype.makeLevelOne = function(player){

	for (var i = 0; i < this.mapHeight; i++) {
		this.map[i] = new Array(this.mapWidth);
	}
	for ( var i = 0; i < this.mapHeight; i++ ){
		for ( var j = 0; j < this.mapWidth; j++ ){
			tile = new Tile({
				xValue: i,
				yValue: j,
				tileType: Math.floor((Math.random() * 3) + 1)
			});
			this.map[i][j] = tile;
		}
	}
}

TileMap.prototype.checkOccupied = function(options){
	if (options.moveToX > 0 && options.moveToX < this.mapWidth){
		if (options.moveToY > 0 && options.moveToY < this.mapHeight){
			//checking tiles inside here as there are no out of bounds checks here
			if ( this.map[options.moveToX][options.moveToY].hasEntity() ){
				return true; //occupied
			} else {
				return false; 
			}
		}
	}
	return true;
}

TileMap.prototype.checkMoveEnemy = function(options){

	if (options.moveToX > 0 && options.moveToX < this.mapWidth){
		if (options.moveToY > 0 && options.moveToY < this.mapHeight){
			//checking tiles inside here as there are no out of bounds checks here
			if ( this.map[options.moveToX][options.moveToY].hasEntity() ){
				return false; //cannot move
			}
			return true; // all clear, you can move
		}
	}
}

TileMap.prototype.checkMovePlayer = function(options){
	//collision check here
	if (options.moveToX > 0 && options.moveToX < this.mapWidth){
		if (options.moveToY > 0 && options.moveToY < this.mapHeight){
			return true;
		}
	}
}

TileMap.prototype.moveEnemy = function(options){
	this.map[options.currentX][options.currentY].removeEntity(options.enemy);
	this.map[options.moveToX][options.moveToY].addEntity(options.enemy);

	options.enemy.setX(options.moveToX);
	options.enemy.setY(options.moveToY);

}

TileMap.prototype.movePlayer = function(options){
	
	this.map[options.currentX][options.currentY].removeEntity(options.player);
	this.map[options.moveToX][options.moveToY].addEntity(options.player);

	options.player.setX(options.moveToX);
	options.player.setY(options.moveToY);

}

TileMap.prototype.addEnemy = function(options){
	if ( !this.map[options.xCoord][options.yCoord].hasEntity() ){
		this.map[options.xCoord][options.yCoord].addEntity(options.enemy);
	};
}

TileMap.prototype.addPlayer = function(options){
	this.map[options.xCoord][options.yCoord].addEntity(options.player);
}

TileMap.prototype.render = function(options){
	//options.renderableWidth;

	//options.renderableHeight;
	var x1 = options.firstMapTileX;
	var x2 = options.lastMapTileX;
	var y1 = options.firstMapTileY;
	var y2 = options.lastMapTileY;
	var offSetX = 0;
	var offSetY = 0;

	//loop for every renderable tile visible
	for ( i = x1; i < x2; i++ ){ //renderable Tiles in the width of the screen
		for ( j = y1; j < y2; j++ ){ //renderable Tiles in the height of the screen
			if ( i > 0 && i < this.mapWidth && j > 0 && j < this.mapHeight ){ //box check, make sure only render tiles inside map areas

				this.map[i][j].render({
					offSetX: i - x1,
					offSetY: j - y1
				})
			}
		}
	}
}