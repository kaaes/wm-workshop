function setStyles(elements, styles) {
  for (var i = 0, l = elements.length; i < l; i++) {
    var keys = Object.keys(styles);
    var cssText = '';
    for (var j = 0, m = keys.length; j < m; j++) {
      cssText += keys[j] + ':' + styles[keys[j]];
    }
    elements[i].style.cssText = cssText;
  }
}
