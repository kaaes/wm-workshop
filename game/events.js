/*
 * Poczatek - dwa elementy i napisanej funkcji addItem (ale tylko z li)
 * potem - jak dodac kolejny element do drzewa dom
 * refresh strony i dodanie eventow do pojedynczych elementow listy
 * co sie dzieje jesli kolejny element zostanie dodany? (eventy nie dzialaja)
 * dodanie eventu do calej listy, wyjasnienie jak sprawdzic ktory element zostal klikniety
 * dodanie nowych elementow - dziala
 * zadanie - zmodyfikowac funkcje addItem tak, zeby dodawala tez dymki z tekstem
 * zadanie napisac funkcję, która oddeleguje event ale tylko dla elementów które mają klasę active
 * zadanie dodatkowe - stworzyć button, który będzie dodawał element na click (albo dwa - jeden dla aktywnych drugi dla nieaktywnych)
 */
var list = document.getElementById('the-general-awesomeness');

function addItem(text, active) {
  var item = document.createElement('li');
  var span = document.createElement('span');

  if (active) {
    item.classList.add('active');
  }

  span.innerHTML = text || '&hellip;';

  item.appendChild(span);
  list.appendChild(item);
}

function animate(evt) {
  var element = evt.target;
  element.classList.toggle('stop-animation');
}

/*items = list.querySelectorAll('li');

for (var i = 0, l = items.length; i < l; i++) {
  items[i].addEventListener('click', animate);
}*/

list.addEventListener('click', function(evt) {
  console.dir(evt.target);
  if (evt.target.nodeName === 'LI') {
    animate(evt);
  }
})