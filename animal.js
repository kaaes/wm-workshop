var species = ['elephant', 'rhino', 'whale'];

function Animal(head, body, tail, properties) {
  var _this = this; 

  properties = properties || {};

  this._mainEl = document.getElementById('animal');

  this._nameEl = document.getElementById('animal-name');
  this._sayEl = document.getElementById('animal-say');

  this._headEl = document.getElementById('animal-head');
  this._bodyEl = document.getElementById('animal-body');
  this._tailEl = document.getElementById('animal-tail');

  this.head = this.setBodyPart('head', head);
  this.body = this.setBodyPart('body', body);
  this.tail = this.setBodyPart('tail', tail);

  this.color = properties.color || 'brown';
  this.name = properties.name || '';

  this.direction = 'right';

  this.position = {
    x: parseInt(this._mainEl.style.left, 10) || 0,
    y: parseInt(this._mainEl.style.top, 10) || 0
  }

  this.setName(this.name);

  setInterval(function() {
    _this.wag(-2);
  }, 1000);

  setInterval(function() {
    _this.nod(2);
  }, 1500);
}

Animal.prototype.setBodyPart = function(part, animal) {
  var node = this['_' + part + 'El'];
  node.src = 'https://thimble.webmaker.org/s/zoo-large/' + animal + '-' + part + '.png';

  return node;
}

Animal.prototype.setName = function(name) {
  this._nameEl.innerHTML = name;
  this.name = name;
}

Animal.prototype.say = function(what) {  
  var _this = this;

  this._sayEl.innerHTML = what;
  this._sayEl.classList.remove('hidden');
  
  setTimeout(function() {
    _this._sayEl.classList.add('hidden');
  }, 2000);
};

Animal.prototype.move = function(right, bottom) {
  this.position.x += right;
  this.position.y += bottom;

  this._mainEl.style.left = this.position.x + 'px';  
  this._mainEl.style.top = this.position.y + 'px'; 

  return this; 
}

Animal.prototype._rotate = function(part, deg) {
  var _this = this;
  this['_' + part + 'El'].style.webkitTransform = 'rotate(' + deg + 'deg)';

  setTimeout(function() {
    _this['_' + part + 'El'].style.webkitTransform = 'rotate(0)';
  }, 2000);
}

Animal.prototype.nod = function(deg) {
  this._rotate('head', deg);
}

Animal.prototype.wag = function(deg) {
  this._rotate('tail', deg);
}

Animal.prototype.flip = function() {
  this._mainEl.classList.toggle('flip');

  if (this._mainEl.classList.contains('flip')) {
    this.direction = 'left';
  } else {
    this.direction = 'right';
  }
}

Animal.prototype.jump = function() {
  var _this = this;
  this.move(0, -50);
  setTimeout(function() {
    _this.move(0, 50);
  }, 300);
}

Animal.prototype.eat = function() {

}

Animal.prototype.poop = function() {

}