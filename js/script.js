"use strict"



let elems = document.querySelectorAll('.note');
for (let elem of elems) {
    elem.style.background=getRandColor();
}

function getRandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
}