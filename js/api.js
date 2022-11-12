import {showAlert} from './utils.js';

//Получение данных
const getData = (onSuccess) => {
  //Выполняем запрос к серверу через fetch с помощью метода get(не указывает объект настроек)
  fetch('https://27.javascript.pages.academy/kekstagram/data')
  //получаем объект ответов
    .then((response) => response.json())
    .then((imgContainer) => {
      //передаем колбэк с фото
      onSuccess(imgContainer);
    })
    .catch(() => {
      showAlert();
    });
};

//Отправка данных (onSuccess - успешно, onFail -сообщение об ошибке, body - данные для тела запроса)
const sendData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/kekstagram',
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

export {getData, sendData};
