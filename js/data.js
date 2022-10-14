import { getRandomInteger, getRandomArrayElement } from './random.js';


const DESCRIPTIONS = [
  'Какое то фото...', 'Какое то другое фото','Придумайте сами подпись, а?',
  'Что скажете ?', 'Лайк , если понравилось', 'Да знаю,сфоткано как будто на пульт от телевизора',
  'Вот такая фотография', 'Ставь лайк - листай дальше',
  'Да , знаю можно было и лучше сфотографировать', 'Если фото наберет 50 лайков ,обещаю выучить javascript',
  'Тебе это надо а?','Круто же?', 'Все, описание сами придумывайте.',
  'А мы тут js пытаемся изучить...', 'В следующий раз получше ракурс возьму', 'Тут должно быть описание.',
];

const MESSAGE = [
  'Всё отлично.',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле.',
];

const NAMES = ['Инокентий', 'Валера', 'Геннадий', 'Юля', 'Катя', 'Варфоломей', 'Алла', 'Вадим', 'Елизавета','Олег','Варвара', 'Степан', 'Николай', 'Тамара', 'Анфиса'];

const commentsIDs = [];

const getRandomCommentID = () => {
  const randomID = getRandomInteger(1, 9999999);

  if (commentsIDs.includes(randomID)) {
    return getRandomCommentID();
  }

  commentsIDs.push(randomID);
  return randomID;
};

const getComment = function () {
  return {
    id: getRandomCommentID(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};
/**
 *
 * @param {undefined} _ не используется
 * @param {number} index начинается с 0
 * @returns
 */

const getPhoto = (_, index) => {
  const id = index + 1;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({ length: getRandomInteger(0, 30) }, getComment),
  };
};

Array.from({ length: 25 }, getPhoto);

