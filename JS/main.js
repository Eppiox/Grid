//Listeners
window.addEventListener( "keydown", doKeyDown, true);
window.addEventListener('resize', resizeCanvas, false);

//main
document.addEventListener('DOMContentLoaded', function () {
	//make new game
	

	var gridTest = new Game();

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	setInterval(function(){

		gridTest.update();
		gridTest.render();

	},1000 / FPS)
});

function doKeyDown(e){
	LAST_KEY_PRESSED = e.keyCode;	
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
