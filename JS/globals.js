//image loader class
var imagesLoaded = false;
var images = {};

var TILE_WIDTH = 16;
var TILE_HEIGHT = 16;

var FPS = 50;
//render on every #nth frame instead of all 50.
var RENDER_THROTTLE = 5;

var sources = {
  darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
  yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg',
  knight: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/swordsman.png',
  evilEye: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/evileye.png',
  sand: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/sandSmall.jpg',
  dirt: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/dirtSmall.jpg',
  stone: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/smoothStoneSmall.jpg',
  black: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/black.jpg',
  player: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/player.png',
  enemy: 'http://epi.customer.netspace.net.au/Html/JS/Grid2/images/enemy.png'
};

//canvas
var canvas = document.getElementById('myCanvas');

var context = canvas.getContext('2d');

//animations
var knights = [];

var LAST_KEY_PRESSED = '';

var snd = new Audio("sounds/falling2.wav"); // buffers automatically when created
var dead = document.getElementById("dead");
