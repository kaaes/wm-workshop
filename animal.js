var species = ['elephant', 'rhino', 'whale'];

function Animal(head, body, tail, properties) {

  this.head = head;
  this.body = body;
  this.tail = tail;

  this.color = properties.color || 'brown';
  this.name = properties.name || 'Charlie';

}

Animal.prototype._createBodyPart = function(part, animal) {

}

Animal.prototype.say = function(what) {
  return what;
};

Animal.prototype.eat = function() {

}

Animal.prototype.poop = function() {

}