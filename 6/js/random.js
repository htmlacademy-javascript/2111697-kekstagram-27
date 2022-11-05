

/**
 * Функция генерации рандомного числа.
 * На основе материала {@link https://learn.javascript.ru/task/random-int-min-max| Learn JS}
@param {number} from Целое положительное число
@param {number} to Целое положительное число, которое больше предыдущего
@returns {number} Случайное число в заданном промежутке включительно
*/
const getRandomInteger = (from, to) => {
  const randomNumber = from + Math.random() * (to + 1 - from);
  return Math.floor(randomNumber);
};


/**
 * @param {*} first Предпочительно положительное число
 * @param {*} second Предпочительно положительное число
 * @returns {number} Случайное целое число в заданном промежутке включительно или `NaN`, если аргументы не подходящие
 */
const getRandomIntegerWithChecks = (first, second) => {
  if (typeof first !== 'number' || typeof second !== 'number') {
    return NaN;
  }

  if (first < 0 || second < 0) {
    return NaN;
  }

  if (second < first) {
    [first, second] = [second, first];
  }

  first = Math.ceil(first);
  second = Math.floor(second);

  return getRandomInteger(first, second);
};

/**
 * @template Type
 * @param {Type[]} elements
 * @returns {Type} случайный элемент из переданного массива
 */
const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export { getRandomInteger, getRandomIntegerWithChecks, getRandomArrayElement};
