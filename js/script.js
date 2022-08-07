"use strict"



let elems = document.querySelectorAll('.note');
for (let elem of elems) {
    elem.style.background = getRandColor();
}
//рандомное изменение цвета
function getRandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//удаление заметки
let deleteImgs = document.querySelectorAll('.note__delete');
for (let el of deleteImgs) {
    el.addEventListener('click', deleteNote);
}

function deleteNote() {
    if (this.parentElement.parentElement.querySelector('.note__favorit--active')) {
        if (confirm('Вы действительно хотите удалить избранную заметку?')) {
            this.parentElement.parentElement.remove();
        }
    } else this.parentElement.parentElement.remove();
}

//Добавление в избранное 
let favoritImgs = document.querySelectorAll('.note__favorit');
for (let fav of favoritImgs) {
    fav.addEventListener('click', favorNote);
}
function favorNote() {
    this.classList.toggle('note__favorit--active');
}


//Сохранение заметки
let saveImgs = document.querySelectorAll('.note__saved');
for (let saved of saveImgs) {
    saved.addEventListener('click', saveNote);
}
function saveNote() {
    this.classList.remove('note__notSaved');
}
//Проверка на изменение
let noteTitles=document.querySelectorAll('h2');
let noteText=document.querySelectorAll('.note__text');

for (let el of noteTitles){
    el.addEventListener('blur', notSaved(el.parentElement))
}
for (let el of noteText){
    el.addEventListener('blur', notSaved(el))  
}
function notSaved(el){
    return function() {
    let icon=el.parentElement.querySelector('.note__saved');
    if (icon.classList.contains('note__saved'))
    {
    icon.classList.add('note__notSaved');
    }
}}



// function editNote() {
//     let currentText=this.parentElement.parentElement.previousSibling.previousSibling.innerHTML;
//     let newText=prompt('Введите текст заметки', currentText)
//     if (newText){
//     this.parentElement.parentElement.previousSibling.previousSibling.innerHTML=newText}
//     // this.parentElement.parentElement.previousSibling.innetHTML='asd';
// }
//Изменение заголовка заметки 
// let titles=document.querySelectorAll('h2')
// for (let edit of titles) {
//     edit.addEventListener('dblclick', editTitles);
// }
// function editTitles(){
//     let currentText=this.innerHTML;
//     this.innerHTML=prompt('Введите заголовок заметки',currentText);
// }