import {showAlert} from './utils.js';

const BASE_URL = 'https://27.javascript.pages.academy/kekstagram';

/**Получение данных
 *
 * @param {Function} onSuccess Обработчик данных при успехе
 */
const getPhotosFromServer = (onSuccess) => {
  //Выполняем запрос к серверу через fetch с помощью метода get(не указывает объект настроек)
  fetch(`${BASE_URL}/data`)
  //получаем объект ответов - получаем чистые данные через .json
    .then((response) => response.json())
    .then(onSuccess)
    .catch(showAlert);
};

/**
 *  Отправка данных
 * @param {() => void} onSuccess успешно
 * @param {() => void} onFail сообщение об ошибке
 * @param {BodyInit} body данные для тела запроса
 */

const sendData = (onSuccess, onFail, body) => {
  fetch(BASE_URL,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить фотографию. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить фотографию. Попробуйте ещё раз');
    });
};

export {getPhotosFromServer, sendData};
