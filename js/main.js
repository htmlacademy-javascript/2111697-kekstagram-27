import { getRandomInteger, getRandomArrayElement } from './random.js';

/**
 * Функция для проверки максимальной длины строки.
 * @param {string} verifiedString Входная строка
 * @param {number} [maxLength = 56] Максимальная длина*
 * @param {boolean} result Подходит ли строка по длине
 */

const checkMaxLengthString = (verifiedString, maxLength = 56) =>
  verifiedString.length <= maxLength;

checkMaxLengthString('asdasd');

const DESCRIPTIONS = [
  'Всё отлично.',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Имена авторов также должны быть случайными. Набор имён для комментаторов составьте сами. Подставляйте случайное имя в поле.',
];

const NAMES = ['Артём', 'Валера', 'Алексей', 'Юля', 'Катя', 'Алла'];

const commentsIDs = [];

const getRandomCommentID = () => {
  const randomID = getRandomInteger(1, 9999999);

  return commentsIDs.includes(randomID) ? getRandomCommentID() : randomID;
};

const getComment = function () {
  return {
    id: getRandomCommentID(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(NAMES),
  };
};

const getPhoto = (_, index) => ({
  id: index,
  url: `photos/${getRandomInteger(1, 25)}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({ length: getRandomInteger(0, 30) }, getComment),
});

Array.from({ length: 25 }, getPhoto);

