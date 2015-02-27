function Game(options){
	this.map = [];
	this.entityMap = [];
	this.mapWidth;
	this.mapHeight;
	this.player;
	this.visibleTilesX = 40;
	this.visibleTilesY = 40;
	this.heightFall = -50;
	var level = 1;
	//var player = new Player();

	this.tileWidth = 16;
	this.tileHeight = 16;

	this.newGame();
	this.makeLevelOne();
	this.newPlayer();
}
Game.prototype.newPlayer = function(){
	this.player = new Player({
		xPos: Math.floor( this.mapWidth / 2 ),
		yPos: Math.floor( this.mapHeight / 2 ),
		hp: 10,
		alive:true
	});	
	this.entityMap[this.player.getX()][this.player.getY()] = 2;
}

Game.prototype.newGame = function(){
	this.mapWidth = 100;
	this.mapHeight = 100;
}

Game.prototype.makeLevelOne = function(){
	for (var i = 0; i < this.mapHeight; i++) {
		this.map[i] = new Array(this.mapWidth);
		this.entityMap[i] = new Array(this.mapWidth);
	}
	for ( var i = 0; i < this.mapHeight; i++ ){
		for ( var j = 0; j < this.mapWidth; j++ ){
			this.map[i][j] = Math.floor((Math.random() * 3) + 1); 
		}
	}
}

Game.prototype.loadPlayer = function(){

}

Game.prototype.loadLevel = function(){

}

Game.prototype.begin = function(){

}

Game.prototype.render = function(){
		
	var tilesPerCanvasWidth = Math.floor( canvas.width / this.tileWidth );
	var tilesPerCanvasHeight = Math.floor( canvas.height / this.tileWidth );
	
	var firstMapTileX = Math.floor( this.player.getX() -(tilesPerCanvasWidth / 2)  );
	var lastMapTileX  = Math.floor( this.player.getX() +(tilesPerCanvasWidth / 2)  );
	var firstMapTileY = Math.floor( this.player.getY() -(tilesPerCanvasHeight / 2) );
	var lastMapTileY  = Math.floor( this.player.getY() +(tilesPerCanvasHeight / 2) );

	
	var entityImage;
	if (this.player.alive){
		//get tiles to render
		//get monsters to check
		//get stuff I guess
		//render tiles
		for ( var i = 0; i < tilesPerCanvasWidth; i++ ){
			for ( var j = 0; j < tilesPerCanvasHeight; j++ ){
				entityImage = this.getTileEntity({ xVal:i + firstMapTileX, yVal:j + firstMapTileY });
				//render tiles
				context.drawImage( 
					this.getTileValue({ 
						xVal:i + firstMapTileX, 
						yVal:j + firstMapTileY,
					}),
					0,
					0,
					this.tileWidth,
					this.tileWidth,
					this.tileWidth * i, //position x
					this.tileWidth * j, //position y
					this.tileWidth * 1, //scale x
					this.tileWidth * 1  //scale y
				);
				if ( entityImage ) {
					context.drawImage( 
						entityImage,
						0,
						0,
						this.tileWidth,
						this.tileWidth,
						this.tileWidth * i, //position x
						this.tileWidth * j, //position y
						this.tileWidth * 1, //scale x
						this.tileWidth * 1  //scale y
					);
				}
			}
		}	
	} else {
		context.drawImage( 
			images.player,
			0,
			0,
			this.tileWidth,
			this.tileWidth,
			canvas.width / 2, //position x
			this.heightFall, //position y
			this.tileWidth * 5, //scale x
			this.tileWidth * 5  //scale y
		);
		this.heightFall += 10;
		
		if (this.heightFall > canvas.height){
			console.log('meow');
			dead.className = "fadeIn"
		}
	}
}

Game.prototype.getTileValue = function(options){
	var x = options.xVal;
	var y = options.yVal;
	if (!x)
		return images.black;
	if (!y)
		return images.black;

	if (x <= 0)
		return images.black;
	
	if (y <= 0)
		return images.black;
	
	if (x >= this.mapWidth )
		return images.black;
	
	if (y >= this.mapHeight )
		return images.black;
	
	switch( this.map[x][y] ){ //a stored integer value
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

Game.prototype.getTileEntity = function(options){
	var x = options.xVal;
	var y = options.yVal;

	if (x <= 0)
		return false;

	if (y <= 0)
		return false;
	
	if (x >= this.mapWidth )
		return false;
	
	if (y >= this.mapHeight )
		return false;

	switch( this.entityMap[x][y] ){ //a stored integer value
		case 0:
			return false;
			break;
		case 1:
			return images.player;
			break;
		case 2:
			return images.yoda;
			break;
		default:
			return false;
	}
}

Game.prototype.update = function(){
	//change later to key rebinding pattern
	if ( this.player.alive ){
		this.playerActionCheck( this.player.update() );
		this.updateEntityMap();

		lastKeyPressed = ''; // clear key pressed so only one movement fires off per turn
	} else {

	}
}

Game.prototype.updateEntityMap = function(){
	var x = this.player.getX();
	var y = this.player.getY();

	var oldX = this.player.goldX();
	var oldY = this.player.goldY();
	this.entityMap[oldX][oldY] = 0;
	this.entityMap[x][y] = 1;
}

Game.prototype.playerActionCheck = function(options){
	switch(options){
		case 'none': //w
			break;
		case 'left': //a
				this.movePlayerLeft();
			break;
		case 'right': //d
				this.movePlayerRight();
			break;
		case 'up': //s
				this.movePlayerUp();
			break;
		case 'down': //w
				this.movePlayerDown();
			break;
		default:
			return 'none';
	}
}

Game.prototype.movePlayerLeft = function(){
	var moveTo = this.player.getX() - 1;
	if ( moveTo > 0 ) {
		this.player.setX(moveTo);
	} else {
		this.die();
	}
}
Game.prototype.movePlayerRight = function(){
	var moveTo = this.player.getX() + 1;
	if ( moveTo < this.mapWidth ) {
		this.player.setX(moveTo);
	}	 else {
		this.die();
	}
}
Game.prototype.movePlayerUp = function(){
	var moveTo = this.player.getY() - 1;
	if ( moveTo > 0 ) {
		this.player.setY(moveTo);
	}	 else {
		this.die();
	}
}
Game.prototype.movePlayerDown = function(){
	var moveTo = this.player.getY() + 1;
	if ( moveTo < this.mapHeight ) {
		this.player.setY(moveTo);
	}		 else {
		this.die();
	}
}

Game.prototype.fall = function() {
	snd.play();
}

Game.prototype.die = function(){
	this.fall();
	this.player.alive = false;
}