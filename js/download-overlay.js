import {isEscapeKey} from './random.js';

//находим поле загрузки нового изображения
const imgUploadStart = document.querySelector('#upload-file');

// находим форму редактирования изображения
const editFormImage = document.querySelector('.img-upload__overlay');

// Находим Кнопку для закрытия формы редактирования изображения
const closeButton = document.querySelector('.img-upload__cancel');

//создадим  и перенесем в отдельную переменную
//функцию закрытия на клавишу ESC
const onCloseEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    editFormImage.classList.add('hidden');
  }
};

function openEditForm() {


}

function closeEditForm () {


}

//событие - при клике на загрузку изображения - удаляем класс hidden
//а у body добавляем класс modal-open
imgUploadStart.addEventListener('click', () => {
  editFormImage.classList.remove ('hidden');
  document.body.classList.add('modal-open');

  //закрытие происходит по нажатию клавиши ESC
  document.addEventListener ('keydown', onCloseEscKeydown);
});

//событие - скрываем  форму добавляя класс hidden
//и удаляем класс у body
closeButton.addEventListener('click', () => {
  editFormImage.classList.add ('hidden');
  document.body.classList.remove('modal-open');

  //закрытие происходит по нажатию клавиши ESC
  document.removeEventListener ('keydown', onCloseEscKeydown);
});
