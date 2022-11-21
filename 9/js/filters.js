import { getPhotosFromServer } from './api.js';
import { renderPhotos } from './render-photos.js';
import { debounce, shuffleArray } from './utils.js';

//После завершения загрузки изображений с сервера покажите блок .img-filters
const filters = document.querySelector('.img-filters');

//находим в фильтрах форму
const filtersForm = filters.querySelector('.img-filters__form');

const [defaultButton, randomButton, discussedButton] = filtersForm.children;
//показывает какакая кнопка сейчас активна
let chosenButton = defaultButton;

//создаем функцию которая находит все элементы с классом picture - проходимся по каждому из них и вызываем у элемента метод remove
const clearPhotos = () => document.querySelectorAll('.picture').forEach((el) => el.remove());

export const initFilters = (photos) => {
  //убираем у него скрывающий класс
  filters.classList.remove('img-filters--inactive');

  renderPhotos(photos);

  const discussedPhotos = [...photos].sort(
    (firstPhoto, secondPhoto) => secondPhoto.comments.length - firstPhoto.comments.length
  );

  /**
   *
   * @param {Event} param0
   * @returns
   */
  const onClick = ({ target }) => {
    if (target.tagName === 'BUTTON') {
      /**
       * @type {HTMLbuttonElement}
       */
      const clickedButton = target;

      if (clickedButton !== chosenButton) {
        chosenButton.classList.remove('img-filters__button--active');

        clickedButton.classList.add('img-filters__button--active');

        chosenButton = clickedButton;

        clearPhotos();

        switch (clickedButton) {
          case defaultButton:
            return renderPhotos(photos);
          case discussedButton:
            return renderPhotos(discussedPhotos);
          default:
            break;
        }
      }

      if (clickedButton === randomButton) {
        if (randomButton !== clickedButton) {
          clearPhotos();
        }

        const randomizerPhotos = shuffleArray([...photos]);

        return renderPhotos(randomizerPhotos.slice(0, 10));
      }
      // switch (evt.target.id) {
      //   case value:
      //     break;

      //   default:
      //     break;
      // }
    }
  };

  const debounceClickHandler = debounce(onClick, 500);

  filtersForm.addEventListener('click', debounceClickHandler);
};

//получаем все фото
getPhotosFromServer(initFilters);
