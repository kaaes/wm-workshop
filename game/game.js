var GAME_TILESIZE = 50;

function Game(element) {

  this.gamebody = element;

  this.players = [];
  this.playersList = document.querySelector('#players');
  this.activePlayer = null;

  this.goodies = [];

  this.grid = {
    tilesize: 50,
    x: 20,
    y: 10,
    tiles: {}
  }
}

Game.prototype.init = function() {

  var p1 = new Player('princess', 'Fiona', this.grid.tilesize, { x: 2, y: 2 });
  this.players.push(p1);

  this.createGrid();
  this.addGoodies(20);
  this.addPlayer(p1);

  this.activePlayer = p1;
}

Game.prototype.createGrid = function() {
  
  this.gamebody.style.width  = (this.grid.x * this.grid.tilesize) + 'px';
  this.gamebody.style.height = (this.grid.y * this.grid.tilesize) + 'px';
  
  this.gamebody.classList.add('active');
  
  for (var i = 0; i < this.grid.x; i++) {
    
    this.grid.tiles[i] = {};
    
    for (var j = 0; j < this.grid.y; j++) {
      this.grid.tiles[i][j] = false;
    }
  }
}

Game.prototype.addGoodies = function(howMuch) {
  var goodie, position;
  for (var i = 0; i < howMuch; i++) {
    goodie = new Block('food', 50);
    position = this.getFreeRandomTile();

    goodie.x = position.x;
    goodie.y = position.y;

    this.grid.tiles[position.x][position.y] = goodie;
    
    goodie.create();
  }
}

Game.prototype.addPlayer = function(player, x, y) {
  this.playersList.appendChild(player.element);
}

Game.prototype.movePlayer = function(whereToX, whereToY) {
  console.log(whereToX, whereToY);
  
  if (whereToX >= 0 && whereToX < this.grid.x && whereToY >= 0 && whereToY < this.grid.y) {
    this.activePlayer.move(whereToX, whereToY);
  }
}


/** PLAYER OBJECT **/

function Player(type, name, tilesize, position) {
  this.type = type;
  this.name = name;
  this.element = null;

  this.x = position.x || 0;
  this.y = position.y || 0;
  this.tilesize = tilesize;

  this.create();
  this.move(this.x, this.y);
}

Player.prototype.create = function() {
  var node = document.createElement('li');
  var name = document.createElement('span');

  name.innerHTML = this.name;
  node.appendChild(name);

  this.element = node;
}

Player.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;

  this.element.style.left = (this.x * this.tilesize) + 'px';
  this.element.style.top  = (this.y * this.tilesize) + 'px';
}

/** GOODIE OBJECT **/
function Block(type, value) {
  this.type = type;
  this.value = value;

  this.element = null;

  this.x = 0;
  this.y = 0;

  this.create();
}

Block.prototype.create = function() {
  var sprite = document.createElement('div');
  sprite.classList.add('sprite');
  sprite.classList.add(this.type);
  
  this.element = sprite;
  this.element.dataset.value = block.value;

  this.element.style.left = (block.x * GAME_TILESIZE) + 'px';
  this.element.style.top  = (block.y * GAME_TILESIZE) + 'px';
} 