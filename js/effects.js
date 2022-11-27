//находим окно предварительного просмотра изображения
const imagePreview = document.querySelector ('.img-upload__preview img');

//Находим поле для загрузки нового изображения на сайт
const uploadForm = document.querySelector('.img-upload__form');

//инпут эффекта
const effectLevel = uploadForm['effect-level'];

//Находим слайдер
const sliderElement = uploadForm.querySelector('.effect-level__slider');

const sliderWrapper = sliderElement.parentElement;

const FROM_ZERO_TO_HUNDRED = {
  min: 0,
  max: 100,
  step: 1,
};

const FROM_ZERO_TO_ONE = {
  min: 0,
  max: 1,
  step: 0.1,
};


const FROM_ZERO_TO_THREE = {
  min: 0,
  max: 3,
  step: 0.1,
};


//массив объектов с эффектами
const EFFECTS = [
  {
    name: 'none',
    ...FROM_ZERO_TO_HUNDRED
  },
  {
    name: 'chrome',
    style: 'grayscale',
    ...FROM_ZERO_TO_ONE,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    ...FROM_ZERO_TO_ONE,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    ...FROM_ZERO_TO_HUNDRED,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    ...FROM_ZERO_TO_THREE,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    ...FROM_ZERO_TO_THREE,
    unit: '',
  },
];

const DEFAULT_EFFECT = EFFECTS[0];
sliderWrapper.classList.add('hidden');
let chosenEffect = DEFAULT_EFFECT;


const isDefault = () => chosenEffect === DEFAULT_EFFECT;

const updateSlider = () => {
  sliderWrapper.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if(isDefault()) {
    sliderWrapper.classList.add('hidden');
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
//для обновления слайдера
updateSlider();

//нашли форму, добавили обработчик
uploadForm.addEventListener('change', onFormChange);

//задаем событие у слайдера
sliderElement.noUiSlider.on('update', onSliderUpdate);

export {resetEffects};
