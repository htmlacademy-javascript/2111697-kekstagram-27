// import { createDOMElement } from './utils.js';
// import { isEscapeKey } from './utils.js';

//обернем все в одну функцию
// const showBigPicture = (url, likes, comments, description) => {
//   //находим .big-picture и удаляем класс у элемента .big-picture
//   const fullPicture = document.querySelector('.big-picture');
//   fullPicture.classList.remove('hidden');

//   //После открытия окна добавьте тегу <body> класс modal-open,
//   //чтобы контейнер с фотографиями позади не прокручивался при скролле.
//   const body = document.body;
//   body.classList.add('modal-open');

//   // При закрытии окна не забудьте удалить этот класс.
//   const closeBigPicture = () => {
//     fullPicture.classList.add('hidden');
//     body.classList.remove('modal-open');
//   };

//   //находим .big-picture__cancel и при клике
//   //вызывааем функцию закрытия окна
//   const cancel = fullPicture.querySelector('.big-picture__cancel');
//   cancel.addEventListener('click', () => {
//     closeBigPicture();
//   });

//   //Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.
//   //импортировал функцию закрытия по ESC из utils.js
//   document.addEventListener('keydown', (evt) => {
//     if (isEscapeKey(evt)) {
//       closeBigPicture();
//     }
//   });

//   //Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.
//   const img = fullPicture.querySelector('img');
//   img.src = url;

//   //Количество лайков likes подставьте как текстовое содержание элемента .likes-count.
//   const likesCount = fullPicture.querySelector('.likes-count');
//   likesCount.textContent = likes;

//   //Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.
//   const comment = fullPicture.querySelector('.comments-count');
//   comment.textContent = comments.length;

//   //Описание фотографии description вставьте строкой в блок .social__caption.
//   const descriptionPhoto = fullPicture.querySelector('.social__caption');
//   descriptionPhoto.textContent = description;

//   //После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и
//   //загрузки новых комментариев .comments-loader, добавив им класс hidden
//   const commentCount = fullPicture.querySelector('.social__comment-count');
//   commentCount.classList.add('hidden');

//   const newComment = fullPicture.querySelector('.comments-loader');
//   newComment.classList.add('hidden');

//   /**
//  * Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:
// <li class="social__comment">
//     <img
//         class="social__picture"
//         src="{{аватар}}"
//         alt="{{имя комментатора}}"
//         width="35" height="35">
//     <p class="social__text">{{текст комментария}}</p>
// </li>

// Разметку комментария вынес в utils.js
//  */
//   const socialComments = document.querySelector('.social__comments');
//   socialComments.innerHTML = '';

//   //создаём фрагмент
//   const commentFragments = document.createDocumentFragment();

//   //переберем список методом forEach и создадим функцию с комментарием
//   comments.forEach(({ avatar, name, message }) => {
//     const commentContainer = createDOMElement('li', 'social__comment');

//     const avatarUsers = createDOMElement('img', 'social__picture');
//     avatarUsers.src = avatar;
//     avatarUsers.alt = name;
//     commentContainer.append(avatarUsers);

//     const commentText = createDOMElement('p', 'social__text');
//     commentText.textContent = message;
//     commentContainer.append(commentText);
//     commentFragments.append(commentContainer);
//   });
//   socialComments.append(commentFragments);
// };

// export { showBigPicture };
