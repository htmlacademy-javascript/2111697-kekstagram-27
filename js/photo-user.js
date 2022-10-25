//контейнер для изображений от других пользователей
const imgContainer = document.querySelector('.pictures');
// eslint-disable-next-line no-console
console.log(imgContainer);

//находим фрагмент с содержимым темплейта
const photoTemplate = document.querySelector('#picture').content;
// eslint-disable-next-line no-console
console.log(photoTemplate);

//Создаем свой фрагмент
const photoBox = document.createDocumentFragment ();
// eslint-disable-next-line no-console
console.log(photoBox);

//на основе шаблона создаем клон который нашли выше
//почему через функцию ? в демке было через цикл
function showUserPhotos (usersPhoto) {
  //скопипастил но не до конца понял зачем и что значит эта строка - типа проходимся forEach по массиву ?
  usersPhoto.forEach(({url, likes, comment}) => {
  //клонируем элемент со всеми внутренностями
    const element = photoBox.cloneNode(true);
    // eslint-disable-next-line no-undef
    element.querySelector('.picture__img').src = url;
    // eslint-disable-next-line no-undef
    element.querySelector('.picture__likes').textContent = likes;
    // eslint-disable-next-line no-undef
    element.querySelector('.picture__comments').textContent = comment.length; //или comments???

    photoBox.appendChild(element);
  });
  imgContainer.appendChild(photoBox);
  // eslint-disable-next-line no-console
  console.log(imgContainer);
}

export {showUserPhotos};

//Отобразить фотографии других пользователей.

// Заведите модуль, который будет отвечать за отрисовку миниатюр.

// На основе временных данных для разработки и шаблона #picture
// создайте DOM-элементы,соответствующие фотографиям, и заполните их данными:

// Адрес изображения url подставьте как атрибут src изображения.
// Количество лайков likes выведите в блок .picture__likes.
// Количество комментариев comments выведите в блок .picture__comments.
// Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

// Подключите модуль в проект.
