// test program, creating objects in array and then destroy objects

var CANVAS_WIDTH = 800;
var CANVAS_HEIGHT = 600;
var SPRITE_SIZE = 60;

var game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var aryhold;

var block1 = [ [2,7,0,0],
               [0,10,3,0],
               [0,0,0,0],
               [0,0,0,0] ];
			   
var block2 = [ [2,7,0,0],
               [0,13,0,0],
               [0,9,0,0],
               [0,0,0,0] ];
			   
var block3 = [ [0,5,0,0],
               [2,15,0,0],
               [0,9,0,0],
               [0,0,0,0] ];
			   
var block4 = [ [5,0,0,0],
               [10,4,3,0],
               [0,0,0,0],
               [0,0,0,0] ];

var block5 = [ [6,7,0,0],
               [10,11,0,0],
               [0,0,0,0],
               [0,0,0,0] ];

var block6 = [ [5,0,0,0],
               [10,8,3,0],
               [0,9,0,0],
               [0,0,0,0] ];

// -------------------------------------
// PHASER GAME FUNCTIONS
// -------------------------------------
function preload() {
	game.load.spritesheet('blocks60x60', 'blocks60x60.png', SPRITE_SIZE, SPRITE_SIZE);
}

function create() {

	// blue background
	game.stage.backgroundColor = 0xbada55;

	//  array to hold all blocks
	aryhold = [];
	
	// player input, Z to add and X to remove
	game.input.keyboard.addCallbacks(this, doGameKeyInput, null, null);
}

function doGameKeyInput(key) {
	var kc = key.keyCode;

	// Z to add more
	if (kc == 90) {
		addBlock();
	// X remove
	} else if (kc == 88) {
		removeBlock();
	// A remove all
	} else if (kc == 65) {
		while (aryhold.length > 0) {
			removeBlock()
		};
	};
}

function addBlock() {
	// create new object
	var xpos = game.rnd.integerInRange(0, CANVAS_WIDTH - (3*SPRITE_SIZE));
	var ypos = game.rnd.integerInRange(0, CANVAS_HEIGHT - (3*SPRITE_SIZE));
	
	var i = game.rnd.integerInRange(1, 6);
	var bl = block1;
	if (i == 2) bl = block2;
	if (i == 3) bl = block3;
	if (i == 4) bl = block4;
	if (i == 5) bl = block5;
	if (i == 6) bl = block6;

	var newobj = new BlockObj(game, xpos, ypos, bl);

	// add to array
	aryhold.push(newobj);

	console.log('addBlock - ADD aryhold.length=' + aryhold.length);
}

function removeBlock() {
	// remove random object
	var index = game.rnd.integerInRange(0, aryhold.length-1);
	
	for (var i=0; i < aryhold[index].children.length; i++) {
		aryhold[index].children[i].destroy();
	};
	
	//aryhold[index].children.destroy();
	aryhold[index].destroy(true);

	// remove last item from array
	delete aryhold[index];
	aryhold.splice(index, 1);
	
	console.log('addBlock - REM aryhold.length=' + aryhold.length);
}

function update() {
	// nothing yet
}

function render() {
	game.debug.text('Press Z to add block',    10, 12);
	game.debug.text('Press X to remove block', 10, 24);
	game.debug.text('Press A to remove all',   10, 36);
}


// -------------------------------------
// block object constructor
// -------------------------------------
var BlockObj = function(game, xpos, ypos, ary) {
	// inherits from Phaser.Group
	Phaser.Group.call(this, game);
	this.x = xpos;
	this.y = ypos;
	
	// random color
	var frame = this.game.rnd.integerInRange(0, 3);
	frame = frame * 16;
	
	// find minimum x/y position of block
	for (var y=0; y < ary.length; y++) {
		for (var x=0; x < ary[y].length; x++) {
			// if block part
			var part = ary[y][x];
			if ( part != 0 ) {
				// place block relative to group
				var xrel = x * SPRITE_SIZE;
				var yrel = y * SPRITE_SIZE;
				
				var sprblock = this.game.add.sprite(xrel, yrel, 'blocks60x60', frame+part-1); 
				this.add(sprblock);
			};
		};
	};
};

// Specific JavaScript object/construcor stuff going on here(?)
// game objects are a type of Phaser.Sprite
BlockObj.prototype = Object.create(Phaser.Group.prototype);
BlockObj.prototype.constructor = BlockObj;

