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
		context.save();

	// Use the identity matrix while clearing the canvas
	context.setTransform(1, 0, 0, 1, 0, 0);
	context.clearRect(0, 0, canvas.width, canvas.height);
	// Restore the transform
	context.restore();

	gridTest.update();
	gridTest.render();

	},1000 / fps)
});

function doKeyDown(e){
	lastKeyPressed = e.keyCode;
	
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
