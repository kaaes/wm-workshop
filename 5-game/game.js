/**
 * Create the main Game
 *
 * @param {HTMLElement} element Main element to create game on.
 * @param {Object} options Configuration options
 *  param {Number} options.tilesize The size of a single game tile in pixels
 *  param {Number} options.moveEnergy How much of a player energu will be used during one step
 *  param {Number} options.startEnergy How much energy has the player that is starting.
 */
function Game(element, options) {

  options = options || {};

  this.gamebody = element;

  this.players = [];
  this.goodies = [];

  this.playersList = document.querySelector('#players');
  this.activePlayer = null;

  this.moveEnergy = options.moveEnergy || 20;
  this.startEnergy = options.startEnergy || 100;

  this.goodieSound = options.goodieSound || null;

  this.grid = {
    tilesize: options.tilesize || 50,
    x: 20,
    y: 10,
    tiles: {}
  };

  this.gamebody.style.backgroundSize = this.grid.tilesize + 'px ' + this.grid.tilesize + 'px';
}


/**
 * Creates the game board with given dimensions
 * NOTE: the dimensions should be given as a number of tiles NOT pixels
 *
 * @param {Number} width How many tiles wide?
 * @param {Number} height How many tiles tall?
 */
Game.prototype.createBoard = function(width, height) {
  this.grid.x = width;
  this.grid.y = height;

  this.gamebody.style.width = (this.grid.x * this.grid.tilesize + 1) + 'px';
  this.gamebody.style.height = (this.grid.y * this.grid.tilesize + 1) + 'px';

  this.gamebody.classList.add('active');

  for (var i = 0; i < this.grid.x; i++) {

    this.grid.tiles[i] = {};

    for (var j = 0; j < this.grid.y; j++) {
      this.grid.tiles[i][j] = false;
    }
  }
};

/**
 * Adds given number of goodies to the board
 *
 * @param {Number} howMuch How many elements should be added to the board.
 * @param {Object} options Additional configuration parameters
 *  param {Number} options.energy What is the goodie influence on the player object
 *  param {HTMLElement} options.sound Optional audio element with the sound for the goodie.
 */
Game.prototype.addGoodies = function(howMuch, options) {
  var goodie,
      position,
      type = options.type || '',
      energy = options.energy || 40,
      sound = options.sound || null;

  for (var i = 0; i < howMuch; i++) {
    /** ... **/
    // new Block(...)
  }
};

/**
 * Add player to the game
 *
 * @param {String} name Player's name.
 * @param {String} type Player's type - defines his/her appearance.
 * @param {Object} position Where should the player be added (NOTE: this is
 * in tiles not in pixels), index is zero based.
 */
Game.prototype.addPlayer = function(name, type, position) {
  if (!position || this.grid.tiles[position.x][position.y]) {
    position = this._getFreeRandomTile();
  }

  var player = new Player(name, type, this.grid.tilesize, { position: position });

  this.players.push(player);

  this.playersList.appendChild(player.element);

  this.activePlayer = player;
};


/**
 * Sets the active player on the board
 *
 * @param {Number} index Which player should be set as active
 * a zero based index from 'players' array.
 */
Game.prototype.setActivePlayer = function(index) {
  this.players.forEach(function(el) {
    el.element.classList.remove('active');
  });

  this.activePlayer = this.players[index];
  this.activePlayer.element.classList.add('active');
};

/**
 * Move active player on the board by given number of tiles
 * NOTE: this is the change in position not the coordinations
 *
 * @param {Number} x How many tiles horizontally (-1 move left, 1 move right).
 * @param {Number} y How many tiles vertically (-1 move up, 1 move down).
 */
Game.prototype.moveActivePlayer = function(x, y) {
  var player = this.activePlayer;

  this.movePlayerTo(player, player.x + x, player.y + y);
};

/**
 * Move player by given number of tiles
 * NOTE: this is the change in position not the coordinations
 *
 * @param {Player} player Player that will be moved.
 * @param {Number} x How many tiles horizontally (-1 move left, 1 move right).
 * @param {Number} y How many tiles vertically (-1 move up, 1 move down).
 */
Game.prototype.movePlayer = function(player, x, y) {
  this.movePlayerTo(player, player.x + x, player.y + y);
};

/**
 * Move player to the given position on the board
 * NOTE: in tiles not in pixels
 *
 * @param {Player} player Player that will be moved.
 * @param {Number} x X coordinate of the new player position.
 * @param {Number} y Y coordinate of the new player position.
 */
Game.prototype.movePlayerTo = function(player, x, y) {
  console.log(x, y);

  if (x >= 0 && x < this.grid.x &&
      y >= 0 && y < this.grid.y &&
      player.health > 0) {

    var block = this.grid.tiles[x][y];

    if (block) {
      /** ... **/
    }

    player.move(x, y);

  }
};

/**
 * Moves the player one tile right
 */
Game.prototype.moveRight = function() {
  /** ... **/
};

/**
 * Moves the player one tile left
 */
Game.prototype.moveLeft = function() {
  /** ... **/
};

/**
 * Moves the player one tile up
 */
Game.prototype.moveUp = function() {
  /** ... **/
};

/**
 * Moves the player one tile down
 */
Game.prototype.moveDown = function() {
  /** ... **/
};

/**
 * Util function to get the free tile (to put goodie)
 * The underscore is customary way to show that method
 * is private and is supposed to use only within the object
 * (it shouldn't be called from the main script)
 */
Game.prototype._getFreeRandomTile = function() {
  var x = 0;
  var y = 0;

  do {
    x = parseInt(Math.random() * this.grid.x, 10),
    y = parseInt(Math.random() * this.grid.y, 10);
  } while (this.grid.tiles[x][y] !== false);

  return {
    x: x,
    y: y
  };
};

/** PLAYER OBJECT **/

/**
 * Creates Player object
 *
 * @param {string} name Player's name.
 * @param {string} type Player's type (defines css class to render right image).
 * @param {number} tilesize Game tilesize (to be absle to adjust position).
 * @param {Object} options Additional configuration objects.
 *  param {Object} options.position Where the player should be placed.
 *  param {Number} options.health How much health does the player have.
 */
function Player(name, type, tilesize, options) {
  if (!tilesize) {
    throw new Error('You need to specify tilesize');
  }

  this.type = type;
  this.name = name;
  this.element = null;

  this.health = options.health || 100;

  this.x = options.position.x || 0;
  this.y = options.position.y || 0;
  this.tilesize = tilesize || 50;

  this.createElement();
  this.move(this.x, this.y);
}

/**
 * Creates the player's HTML representation
 * Player's DOM will be stored in 'element' property
 * of the Player object
 */
Player.prototype.createElement = function() {
  var node = document.createElement('li');
  var name = document.createElement('span');

  node.dataset.health = this.health;
  node.classList.add(this.type);
  /** ... **/
  // toggle animation of the moves
  //node.classList.add('static');
  name.innerHTML = this.name;
  node.appendChild(name);

  this.element = node;
};

/**
 * Moves the player to new position
 * NOTE: x & y are the number of tiles
 *
 * @param {Number} x X coordinate of the new player position.
 * @param {Number} y Y coordinate of the new player position.
 */
Player.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;

  this.update();
};

/**
 * Renders player on the board with updated data (health & posistion)
 */
Player.prototype.update = function() {
  this.element.dataset.health = this.health;
  this.element.style.left = (this.x * this.tilesize) + 'px';
  this.element.style.top = (this.y * this.tilesize) + 'px';
};

/** GOODIE OBJECT **/

/**
 * Creates Block object (something that'll be put on the board)
 *
 * @param {string} name Block's name (e.g food).
 * @param {number} tilesize Game tilesize (to be absle to adjust position).
 * @param {Object} options Additional configuration objects
 *  param {Number} options.type Block's type (defines css class to render right image)
 *  param {Number} options.energy This value will be added to players health when
 *                 he enters the field with the Block.
 *  param {Object} options.position Where the goodie should be placed.
 */
function Block(name, tilesize, options) {
  if (!tilesize) {
    throw new Error('You need to specify tilesize');
  }

  this.name = name;

  this.type = options.type || '';
  this.value = options.energy || 0;

  this.x = options.position.x || 0;
  this.y = options.position.y || 0;
  this.tilesize = tilesize || 50;

  this.element = null;

  this.createElement();
}

/**
 * Creates the blocks's HTML representation
 * Block's DOM will be stored in 'element' property
 * of the Block object
 */
Block.prototype.createElement = function() {
  // <div class="{this.name} {this.type}" data-value="{this.value}"></div>
  var element = null;
  /** ... **/

  this.element = element;

  this.update();
};

/**
 * Removes goodie from the board
 */
Block.prototype.remove = function() {
  this.element.parentNode.removeChild(this.element);
};

/**
 * Renders goodie on the board with updated data (value & position)
 */
Block.prototype.update = function() {
  this.element.dataset.value = this.value;
  this.element.style.left = (this.x * this.tilesize) + 'px';
  this.element.style.top = (this.y * this.tilesize) + 'px';
};
