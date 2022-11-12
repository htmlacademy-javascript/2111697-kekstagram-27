import mockPhotos from './mock.js';
import {getPhotosFromServer} from './api.js';
/** контейнер для изображений от других пользователей */
const imgContainer = document.querySelector('.pictures');

/** шаблон миниатюр
 * @type {HTMLAnchorElement}
 */
const photoTemplate = document.querySelector('#picture').content.firstElementChild;

/** создаем пустой фрагмент(предварительная обёртка)
 */
const photoBox = document.createDocumentFragment();

//на основе шаблона создаем клон который нашли выше
for (const photo of mockPhotos) {
  //клонируем элемент со всеми внутренностями
  const photoElement = photoTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  photoBox.append(photoElement);
}

imgContainer.append(photoBox);

//функция отрисовки фото
const renderPhotos = (photos) => {
  console.log(renderPhotos);
};

getPhotosFromServer();
