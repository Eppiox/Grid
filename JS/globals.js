//image loader class
var imagesLoaded = false;
var images = {};

var fps = 50;

var sources = {
  darthVader: 'http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg',
  yoda: 'http://www.html5canvastutorials.com/demos/assets/yoda.jpg',
  knight: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/swordsman.png',
  evilEye: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/evileye.png',
  sand: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/sandSmall.jpg',
  dirt: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/dirtSmall.jpg',
  stone: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/smoothStoneSmall.jpg',
  black: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/black.jpg',
  player: 'http://epi.customer.netspace.net.au/Html/JS/Grid/images/player.png'
};

//canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

//animations
var knights = [];

var lastKeyPressed = '';

var snd = new Audio("sounds/falling2.wav"); // buffers automatically when created
var dead = document.getElementById("dead");
