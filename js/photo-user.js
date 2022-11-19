import {getPhotosFromServer} from './api.js';

/** контейнер для изображений от других пользователей */
const imgContainer = document.querySelector('.pictures');

//После завершения загрузки изображений с сервера покажите блок .img-filters
const filters = document.querySelector('.img-filters');

//находим в фильтрах форму
const filtersForm = filters.querySelector('.img-filters__form');

/** шаблон миниатюр
 * @type {HTMLAnchorElement}
 */
const photoTemplate = document.querySelector('#picture').content.firstElementChild;

//функция отрисовки фото
const renderPhotos = (photos) => {
  /** создаем пустой фрагмент(предварительная обёртка)
   */
  const photoBox = document.createDocumentFragment();

  //на основе шаблона создаем клон который нашли выше
  for (const photo of photos) {
    //клонируем элемент со всеми внутренностями
    const photoElement = photoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoBox.append(photoElement);
  }
  //после всей сделаной разметки ,вызываем в самом конце
  imgContainer.append(photoBox);
};

//создаем функцию которая находит все элементы с классом picture - проходимся по каждому из них и вызываем у элемента метод remove
const clearPhotos = () => document.querySelectorAll('.picture').forEach((el) => el.remove());

//получаем все фото и передаем в функцию
getPhotosFromServer((photos) => {
  //дожидаемся загрузки данных
  renderPhotos(photos);

  //убираем у него скрывающий класс
  filters.classList.remove('img-filters--inactive');
});

filtersForm.addEventListener('click', (evt) => {
  console.log(evt.target);
});
/**
 * Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:

По умолчанию — фотографии в изначальном порядке с сервера.
Случайные — 10 случайных, не повторяющихся фотографий.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.

Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
 */
