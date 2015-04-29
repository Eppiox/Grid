function Game(options){
	//this.player;
	this.level = 1;
	this.mapWidth = 50;
	this.mapHeight = 50;
	this.enemies = [];
	this.player;
	this.tileMap;

	this.newPlayer();
	this.newGame();

	this.renderCounter = 0;
}

Game.prototype.newPlayer = function(){
	this.player = new Player({
		xPos: Math.floor( this.mapWidth / 2 ),
		yPos: Math.floor( this.mapHeight / 2 ),
		hp: 10,
		alive:true
	});	
	//this.entityMap[this.player.getX()][this.player.getY()] = 2;
}

Game.prototype.newGame = function(){
	this.tileMap = new TileMap({
		mapWidth: this.mapWidth,
		mapHeight: this.mapHeight,
		level: 1
	});
	this.tileMap.makeLevelOne(); //could pass difficulty here
	this.tileMap.addPlayer({
		xCoord: this.player.getX(),
		yCoord: this.player.getY(),
		player: this.player
	});
}

Game.prototype.loadPlayer = function(){

}

Game.prototype.loadLevel = function(){
}


Game.prototype.begin = function(){

}

Game.prototype.render = function(){
	this.renderCounter++;
	if ( this.renderCounter >= RENDER_THROTTLE) {
		this.clearScreen();
		this.renderCounter = 0;

		var tilesPerCanvasWidth = Math.floor( canvas.width / TILE_WIDTH );
		var tilesPerCanvasHeight = Math.floor( canvas.height / TILE_HEIGHT );

		var firstMapTileX = Math.floor( this.player.getX() -(tilesPerCanvasWidth / 2)  );
		var lastMapTileX  = Math.floor( this.player.getX() +(tilesPerCanvasWidth / 2)  );
		
		var firstMapTileY = Math.floor( this.player.getY() -(tilesPerCanvasHeight / 2) );
		var lastMapTileY  = Math.floor( this.player.getY() +(tilesPerCanvasHeight / 2) );

		if (this.player.alive){

			this.tileMap.render({
				renderableWidth: tilesPerCanvasWidth,
				renderableHeight: tilesPerCanvasHeight,
				firstMapTileX: firstMapTileX,
				lastMapTileX: lastMapTileX,
				firstMapTileY: firstMapTileY,
				lastMapTileY: lastMapTileY
			});
		}
	} 
}

Game.prototype.clearScreen = function(){
		context.save();

		// Use the identity matrix while clearing the canvas
		context.setTransform(1, 0, 0, 1, 0, 0);
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Restore the transform
		context.restore();
}

Game.prototype.update = function(){
	//change later to key rebinding pattern
	//console.log(LAST_KEY_PRESSED);
	switch (LAST_KEY_PRESSED){
		case 65: //a
			this.playerMoveCheck('left');
			break;
		case 68: //d
			this.playerMoveCheck('right');
			break;
		case 83: //s
			this.playerMoveCheck('down');
			break;
		case 87: //w
			this.playerMoveCheck('up');
			break;
		case 32: //space
			this.makeEnemy(1);
			break;
		case 16: //shift
			this.makeEnemy(10);
			break;
		default:
			LAST_KEY_PRESSED = '';
	}
	LAST_KEY_PRESSED = ''; 

	//move enemies, given a %
	for (var i = 0; i < this.enemies.length; i++){
		if ( this.chanceCheck({ check:80, outOf:100 }) ){
			this.randomMoveEnemy(this.enemies[i]);
		}
	}
}

Game.prototype.chanceCheck = function(options){
	if (Math.floor((Math.random() * options.outOf) ) > options.check){
		return true;
	}
	return false;
}
Game.prototype.randomMoveEnemy = function(enemy){

	var	enemyX = enemy.getX();
	var	enemyY = enemy.getY();
	var newX = enemyX;
	var newY = enemyY;
	var moveRand = Math.floor((Math.random() * 4) + 1);
	switch(moveRand){
		case 1: //up
			newY -=1;
			break;
		case 2: //down
			newY +=1;
			break;
		case 3: //left
			newX -=1;
			break;
		case 4: //right
			newX +=1;
			break;		
	}
	var occupied = this.tileMap.checkOccupied({
		moveToX: newX,
		moveToY: newY
	});
	if (!occupied){
		this.tileMap.moveEnemy({ 
			currentX: enemyX,
			currentY: enemyY,
			moveToX: newX,
			moveToY: newY,
			enemy: enemy
		});
	}
}

Game.prototype.makeEnemy = function(amount){
	var attempts = 0;
	var spawnedOnPlayer = false;

	for ( var i = 0; i < amount; i){
		spawnedOnPlayer = false;
		if (attempts > 100){
			console.log("attempts to add a new enemy exceded 100");
			break;
		}

		var randX = Math.floor((Math.random() * this.mapWidth-1) + 1);
		var randY = Math.floor((Math.random() * this.mapHeight-1) + 1);
		
		var occupied = this.tileMap.checkOccupied({
				moveToX: randX,
				moveToY: randY
			});

		if (( randX == this.player.getX() ) && ( randY != this.player.getY() )) {
			spawnedOnPlayer = true;
		}
		if (!spawnedOnPlayer) { //don't spawn on player
			if ( !occupied ){
				var enemy = new Enemy({
					xPos: randX,
					yPos: randY,
					hp: 1,
					alive: true
				});
			
				this.tileMap.addEnemy({
					xCoord: randX,
					yCoord: randY,
					enemy: enemy
				});

				this.enemies.push(enemy);
				i++;
			}
		}
		attempts++;
	}
	console.log("Added: " + i + " enemies " + attempts + " attempts");
}


Game.prototype.playerMoveCheck = function(options){
	var xValue = 0;
	var yValue = 0;
	switch(options){
		case 'none': 
			break;
		case 'left': 
			xValue -= 1;
			break;
		case 'right': 
			xValue += 1;
			break;
		case 'up': 
			yValue -= 1;
			break;
		case 'down': 
			yValue += 1;
			break;
	}
	var canPlayerMove = this.tileMap.checkMovePlayer({ 
		currentX: this.player.getX(),
		currentY: this.player.getY(),
		moveToX: this.player.getX()+xValue,
		moveToY: this.player.getY()+yValue,
	});	
	if (canPlayerMove){
		this.tileMap.movePlayer({ 
			currentX: this.player.getX(),
			currentY: this.player.getY(),
			moveToX: this.player.getX()+xValue,
			moveToY: this.player.getY()+yValue,
			player: this.player
		});	
	}
	this.renderCounter = RENDER_THROTTLE; //if player has moved, re-call render
}


Game.prototype.fall = function() {
	snd.play();
}

Game.prototype.die = function(){
	this.fall();
	this.player.alive = false;
}