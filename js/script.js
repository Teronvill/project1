"use strict";

let elems = document.querySelectorAll('.note');
for (let elem of elems) {
    elem.style.background = setRandColor(getRandNum(1,4),getRandNum(1,3),getRandNum(1,359));
}
let btns=document.querySelectorAll('.setting__btn');
console.log(btns[0]);
btns[0].addEventListener('click', addNote);
//Фон
// let body=document.querySelector('html');
// body.style.background=setRandColor(getRandNum(1,4),getRandNum(1,3),getRandNum(1,359));


//Рандомное число
function getRandNum(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
//Возврат цвета либо градиента
function setRandColor(colorCount,gradNum,deg) {
    let typeGrad;
    if (gradNum==1){
        typeGrad='linear-gradient('+deg+'deg,';
    }
    else typeGrad='radial-gradient(';
    
    
    if (colorCount == 1)
        return getRandColor();
    else if (colorCount == 2)
        return typeGrad + getRandColor() + ',' + getRandColor() + ')';
    else return typeGrad + getRandColor() + ',' + getRandColor() +' '+getRandNum(50,60)+'%,' + getRandColor() + ')';

}
//Рандомное изменение цвета
function getRandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//Удаление заметки
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
//Проверка на изменение текста и заголовка
let noteTitles = document.querySelectorAll('h2');
let noteText = document.querySelectorAll('.note__text');

for (let el of noteTitles) {
    el.addEventListener('blur', notSaved(el.parentElement, el.textContent));
}

for (let el of noteText) {
    el.addEventListener('blur', notSaved(el, el.textContent));
}

function notSaved(el, text) {
    return function () {
        if (this.textContent != text) {
            let icon = el.parentElement.querySelector('.note__saved');
            if (icon.classList.contains('note__saved')) {
                icon.classList.add('note__notSaved');
            }
            
        }
    };
}

function addNote(){
    let newNote=document.createElement('div');

    let workArea=document.querySelector('.work-area');
    
    newNote.classList.add('note');
    newNote.innerHTML=`<div class="note__title"><h2 class="note__title" contenteditable="true">Заголовок</h2><div class="note__delete img" ></div></div><div class="note__text" contenteditable="true">Текст</div><div class="note__footer"><div class="note__date">${currentDate()}</div><div class="note__btns"><div class="note__favorit img"></div><div class="note__saved img"></div></div></div>`;
    newNote.style.background = setRandColor(getRandNum(1,4),getRandNum(1,3),getRandNum(1,359));
    workArea.append(newNote);
}

function currentDate() {
    function checkNum(num){
        if (num<10)
        return '0'+num;
        else return num;
    }
    let noteDate=new Date();
    let month=noteDate.getMonth();
    return checkNum(noteDate.getDate()+'.'+checkNum(noteDate.getMonth()+1)+'.'+noteDate.getFullYear())

}



//Заметка на сайт-заметку
//При изменении заметки и потери фокуса (блюре) загорается дискета, но при повторном блюре она
//загорается даже если не изменять текст ---надо пофиксить
//
//Может удалить радиальный градиент?
// 
// 
// 
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