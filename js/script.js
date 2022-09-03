"use strict";


let elems = document.querySelectorAll('.note');
for (let elem of elems) {
    elem.style.background = setRandColor(getRandNum(1, 4), getRandNum(1, 3), getRandNum(1, 359));
}
let noteId=0;
loadNotes();
//кнопки настроек
let btns = document.querySelectorAll('.setting__btn');

btns[0].addEventListener('click', () => {addNote();});
btns[1].addEventListener('click', () => {
    for (let elem of elems) {
        elem.style.background = setRandColor(getRandNum(1, 4), getRandNum(1, 3), getRandNum(1, 359));
    }
});
btns[2].addEventListener('click', changeColor);
btns[5].addEventListener('click', saveNotes);
//Фон
// let body=document.querySelector('html');
// body.style.background=setRandColor(getRandNum(1,4),getRandNum(1,3),getRandNum(1,359));

//Изменение цвета элемента
let colorPicker=document.querySelector('.colorPicker');
function changeColor(el){
 el.target.parentElement.parentElement.parentElement.parentElement.style.background=colorPicker.dataset.currentColor;
}
//Вызов палитры
// let pallets=document.querySelectorAll('.note__pallet');
// for (let el of pallets){
//     el.addEventListener('click', showPallet); 
// }
//Показ панели
function showPallet(){
    this.previousElementSibling.classList.toggle('hide');
}
function update(color){
    let note=color.id.parentElement;
    note.style.background= color.toRGBAString();
}
//Изменение цвета иконок при клике
function changeIconCol (){
    
}


//Рандомное число
function getRandNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//Возврат цвета либо градиента
function setRandColor(colorCount, gradNum, deg) {
    let typeGrad;
    if (gradNum == 1) {
        typeGrad = 'linear-gradient(' + deg + 'deg,';
    } else typeGrad = 'radial-gradient(';


    if (colorCount == 1)
        return getRandColor();
    else if (colorCount == 2)
        return typeGrad + getRandColor() + ',' + getRandColor() + ')';
    else return typeGrad + getRandColor() + ',' + getRandColor() + ' ' + getRandNum(50, 60) + '%,' + getRandColor() + ')';

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


//Сохранение одной заметки
let saveImgs = document.querySelectorAll('.note__saved');
for (let saved of saveImgs) {
    saved.addEventListener('click', saveNotes);
}
function cleanIcon(){
    let saveImgs = document.querySelectorAll('.note__saved');
    for (let saved of saveImgs) {
        saved.classList.remove('note__notSaved');
    }
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

// Добавить заметку

function addNote(title='Заголовок',text = 'Введите текст заметки', date = currentDate(), favor = false, background) {
    let newNote = document.createElement('div');
    let workArea = document.querySelector('.work-area');
    let curId='note'+noteId++;
    newNote.classList.add('note');
    newNote.innerHTML = `<div id='${curId}' class="note__title" '><h2 class="note__title" contenteditable="true">${title}</h2><div class="note__delete img"></div></div><div class="note__text" contenteditable="true">${text}</div><div class="note__footer"><div class="note__date">${date}</div><div class="note__btns"><div class="note__pallet img colorPicker" data-jscolor="{onChange: 'update(this,this.id=${curId})',onInput: 'update(this,this.id=${curId})',alpha:1, value:'CCFFAA'}"></div><div class="note__text-color img"></div><div class="note__favorit img"></div><div class="note__saved img"></div></div></div>`;
    if (background){
        newNote.style.background=background;
     }
     else {
        newNote.style.background = setRandColor(getRandNum(1, 4), getRandNum(1, 3), getRandNum(1, 359)); 
     }
    workArea.append(newNote);
    let del = newNote.querySelector('.note__delete');
    del.addEventListener('click', deleteNote);
    let noteTitle = newNote.querySelector('h2');
    noteTitle.addEventListener('blur', notSaved(noteTitle.parentElement, noteTitle.textContent));
    let noteText = newNote.querySelector('.note__text');
    noteText.addEventListener('blur', notSaved(noteText, noteText.textContent));
    let saveImg = newNote.querySelector('.note__saved');
    saveImg.addEventListener('click', saveNotes);
    // let palletImg = newNote.querySelector('.note__pallet');
    // palletImg.addEventListener('click', showPallet);
    let favoritImg = newNote.querySelector('.note__favorit');
    
    if (favor) {
        favoritImg.classList.add('note__favorit--active');
    }
    favoritImg.addEventListener('click', favorNote);
    elems = document.querySelectorAll('.note');

}

//Текущая дата
function currentDate() {
    function checkNum(num) {
        if (num < 10)
            return '0' + num;
        else return num;
    }
    let noteDate = new Date();
    let month = noteDate.getMonth();
    return checkNum(noteDate.getDate() + '.' + checkNum(noteDate.getMonth() + 1) + '.' + noteDate.getFullYear())

}
// Сохранить все заметки
function saveNotes() {
    cleanIcon();
    let arr = [];
    let notes = document.querySelectorAll('.note');
    for (let note of notes) {
        let obj = {};
        obj.title = note.querySelector('h2').innerHTML;
        obj.text = note.querySelector('.note__text').innerHTML;
        obj.date = note.querySelector('.note__date').innerHTML;
        obj.background=note.style.background;
        if (note.querySelector('.note__favorit--active') != null)
            {obj.favor = true;}
        else obj.favor = false;
        arr.push(obj);
        
    }
    localStorage.setItem('arr', JSON.stringify(arr));

}

//Загрузка заметок из хранилища
function loadNotes() {
    let arr = JSON.parse(localStorage.getItem('arr'));
    for (let i in arr){
        addNote(arr[i].title, arr[i].text, arr[i].date, arr[i].favor,arr[i].background);
}
}

//Будущая палитра 
// var ball = document.querySelector('.ball');

// ball.onmousedown = function (e) { // 1. отследить нажатие
//     ball.classList.toggle('vision');
//     // подготовить к перемещению
//     // 2. разместить на том же месте, но в абсолютных координатах
//     ball.style.position = 'absolute';
//     moveAt(e);
//     // переместим в body, чтобы мяч был точно не внутри position:relative
//     document.body.appendChild(ball);

//     ball.style.zIndex = 1000; // показывать мяч над другими элементами

//     // передвинуть мяч под координаты курсора
//     // и сдвинуть на половину ширины/высоты для центрирования
//     function moveAt(e) {
//         ball.style.left = e.pageX - ball.offsetWidth / 2 + 'px';
//         ball.style.top = e.pageY - ball.offsetHeight / 2 + 'px';
//     }

//     // 3, перемещать по экрану
//     document.onmousemove = function (e) {
//         moveAt(e);
//     }

//     // 4. отследить окончание переноса
//     ball.onmouseup = function () {
//         document.onmousemove = null;
//         ball.onmouseup = null;
//     }
// }



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