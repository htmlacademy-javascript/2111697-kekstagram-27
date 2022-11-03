//находим окно предварительного просмотра изображения
const imagePreview = document.querySelector ('.img-upload__preview');

//Находим поле для загрузки нового изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');

//инпут эффекта
const effectLevel = document.querySelector('.effect-level__value');

//Находим слайдер
const sliderElement = document.querySelector('.effect-level__slider');

//массив объектов с эффектами
const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0.1,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0.1,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 0,
    max: 3,
    step: 0.1,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

//не совсем понимаю эту функцию
const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderElement.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if(isDefault()) {
    sliderElement.classList.add('hidden');
  }
};

//обработчик события выбора эффекта
const onFormChange = (evt) => {
  //проверка содержится ли определенный класс с
  //эффектом при клике
  if(!evt.target.classList.contains('effects__radio')) {
    return;
  }
  //если это радио кнопка то в переменную
  //chosenEffect записывается один из эффектов
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  //вызываем функцию для применения эффекта
  updateSlider();
};


const onSliderUpdate = () => {
  imagePreview.style.filter = 'none';
  imagePreview.className = '';
  effectLevel.value = '';
  if(isDefault()) {
    return;
  }
  // получили эффект  и записываем в переменную
  const sliderValue = sliderElement.noUiSlider.get();

  //применяем фильтр к изображению imagePreview
  imagePreview.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  imagePreview.classList.add(`effects__preview--${chosenEffect.name}`);
  effectLevel.value = sliderValue;
};

//сброс эффектов
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

//создаем слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECT.max,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});
updateSlider();

//нашли форму, добавили обработчик
uploadForm.addEventListener('change', onFormChange);

//задаем событие у слайдера
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
