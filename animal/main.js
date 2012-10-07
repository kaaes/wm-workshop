var animal = new Animal('rhino', 'whale', 'whale');
var form = document.getElementById('animal-app');
var sayInp = form.say;

form.addEventListener('submit', function(evt){
  evt.preventDefault();
  return false;
});

sayInp.addEventListener('change', function(evt) {
  if (this.value === 'flip') {
    animal.flip();
    animal.say('flipped!');
  } else {
    animal.say(this.value);
  }
  this.value = '';
}, false);

document.body.addEventListener('dblclick', function(evt) {
  evt.preventDefault();

  var mouseX = evt.clientX;
  var mouseY = evt.clientY;

  var needFlip = (mouseX < animal.position.x && animal.direction === 'right')
    || (mouseX > animal.position.x && animal.direction === 'left'); 

  if (needFlip) {
    animal.flip();
  }

  var left = mouseX - animal.position.x - 250;
  var bottom = mouseY - animal.position.y - 150;

  animal.move(left, bottom);
})