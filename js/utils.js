const body = document.body;
const ALERT_SHOW_TIME = 5000;

/**
 * @param {KeyboardEvent} evt
 */

const isEscapeKey = (evt) => evt.key === 'Escape';

//ф-ция вывода сообщения об ошибке
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '25%';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 5px';
  alertContainer.style.lineHeight = '20px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';

  alertContainer.textContent =
    'Не удалось загрузить фотографии. Попробуйте ещё раз через некоторое время';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const removeFormModalMessage = (modal, closeButton) => {
  const onModalClick = (evt) => {
    if (!evt.target.closest(`.${modal.className}__inner`)) {
      destroyModal();
    }
  };

  modal.addEventListener('click', onModalClick);

  /**
   *
   * @param {KeyboardEvent} evt
   */

  const onDocumentKeyDown = (evt) => {
    evt.stopPropagation();

    if (isEscapeKey(evt)) {
      destroyModal();
    }
  };

  document.addEventListener('keydown', onDocumentKeyDown, true);

  const cancel = modal.querySelector(closeButton);
  cancel.addEventListener(
    'click',
    () => {
      destroyModal();
    },
    { once: true }
  );

  function destroyModal() {
    body.lastChild.remove();
    document.removeEventListener('keydown', onDocumentKeyDown);
    modal.removeEventListener('click', onModalClick);
  }
};
/**
 *
 * @param {'success' | 'error'} type
 */
const createFormModalMessage = (type) => {
  const templateSuccessMessage = document
    .querySelector('#success')
    .content.querySelector('.success');
  const templateErrorMessage = document.querySelector('#error').content.querySelector('.error');
  const template = type === 'success' ? templateSuccessMessage : templateErrorMessage;

  const buttonClass = type === 'success' ? '.success__button' : '.error__button';

  const message = template.cloneNode(true);
  removeFormModalMessage(message, buttonClass);
  body.append(message);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce(callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_throttle

function throttle(callback, delayBetweenFrames) {
  // Используем замыкания, чтобы время "последнего кадра" навсегда приклеилось
  // к возвращаемой функции с условием, тогда мы его сможем перезаписывать
  let lastTime = 0;

  return (...rest) => {
    // Получаем текущую дату в миллисекундах,
    // чтобы можно было в дальнейшем
    // вычислять разницу между кадрами
    const now = new Date();

    // Если время между кадрами больше задержки,
    // вызываем наш колбэк и перезаписываем lastTime
    // временем "последнего кадра"
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

/**
 * Перемешиват переданный массив
 * @template Type
 * @param {Type[]} array
 */

const shuffleArray = (array) => {
  for (let index = array.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [array[index], array[randomIndex]] = [array[randomIndex], array[index]];
  }
  return array;
};

const createDOMElement = (element, elementClass) => {
  /**@type {HTMLElement} */
  const object = document.createElement(element);
  object.classList.add(elementClass);
  return object;
};

export { isEscapeKey, showAlert, createFormModalMessage, debounce, throttle,
  shuffleArray,createDOMElement };
