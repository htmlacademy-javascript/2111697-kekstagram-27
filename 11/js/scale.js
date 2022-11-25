//находим кнопки - и +
const smallerButton = document.querySelector('.scale__control--smaller');
const buggerButton = document.querySelector('.scale__control--bigger');

//находим отображение значения
const scaleInputControl = document.querySelector('.scale__control--value');

//находим окно предварительного просмотра изображения
const imagePreview = document.querySelector('.img-upload__preview img');

//создаем константы  мин и макс масштаб, масштаб по умолчанию и шаг масштабирования
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

//функция которая вызывает масштабирование
const scaleImage = (value = SCALE_DEFAULT) => {
  imagePreview.style.transform = `scale(${value / 100})`;
  scaleInputControl.value = `${value}%`;
};

//функция клика по кнопке -
const onSmallerButtonClick = () => {
  //из строки делаем число с помощью parseInt()
  const currentValue = parseInt(scaleInputControl.value, 10);
  //высчитываем новое число и добавляем проверку
  let newValue = currentValue - SCALE_STEP;
  //проверка - если полученное новое значение меньше SCALE_MIN
  //то ставим минимальное значение
  if(newValue < SCALE_MIN) {
    newValue = SCALE_MIN;
  }
  scaleImage (newValue);
};

//функция клика по кнопке +
const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInputControl.value, 10);
  //высчитываем новое число и добавляем проверку
  let newValue = currentValue + SCALE_STEP;
  //проверка - если полученное новое значение больше SCALE_MAX
  //то ставим максимальное значение
  if(newValue > SCALE_MAX) {
    newValue = SCALE_MAX;
  }
  scaleImage (newValue);
};

//функция сброса масштаба
const resetScale = () => {
  scaleImage();
};

//события когда пользователь кликает - или +
smallerButton.addEventListener('click', onSmallerButtonClick);
buggerButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
