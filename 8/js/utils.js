
const body = document.body;
const ALERT_SHOW_TIME = 5000;
/**
 * Функция для проверки максимальной длины строки.
 * @param {string} verifiedString Входная строка
 * @param {number} [maxLength = 56] Максимальная длина*
 * @param {boolean} result Подходит ли строка по длине
 */

const checkMaxLengthString = (verifiedString, maxLength = 140) => verifiedString.length <= maxLength;

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

  alertContainer.textContent = 'Не удалось загрузить фотографии. Попробуйте ещё раз через некоторое время';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const removeFormModalMessage = (modal,closeButton) => {
  const onModalClick = (evt) => {
    if(!evt.target.closest(`.${modal.className}__inner`)){
      destroyModal();
    }
  };

  modal.addEventListener('click', onModalClick);

  const onDocumentKeydown = (evt) => {
    if(isEscapeKey(evt)){
      destroyModal();
    }
  };

  document.addEventListener('keydown', onDocumentKeydown);

  const cancel = modal.querySelector(closeButton);
  cancel.addEventListener('click', () => {
    destroyModal();
  },{once:true});

  function destroyModal () {
    body.lastChild.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    modal.removeEventListener('click', onModalClick);
  }
};
/**
 *
 * @param {'success' | 'error'} type
 */
const createFormModalMessage = (type) => {
  const templateSuccessMessage = document.querySelector('#success').content.querySelector('.success');
  const templateerrorMessage = document.querySelector('#error').content.querySelector('.error');
  const template = type === 'success'
    ? templateSuccessMessage
    : templateerrorMessage;

  const buttonClass = type === 'success'
    ? '.success__button'
    : '.error__button';

  const message = template.cloneNode(true);
  removeFormModalMessage(message, buttonClass);
  body.append(message);
};

export {isEscapeKey, checkMaxLengthString, showAlert, createFormModalMessage};
