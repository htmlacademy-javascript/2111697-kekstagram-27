checkMaxLengthString('verifiedString.', 2000);

getRandomIntegerWithChecks(22, 10);

/**
 * Функция для проверки максимальной длины строки.
 * @param {string} verifiedString Входная строка
 * @param {number} [maxLength = 56] Максимальная длина*
 * @param {boolean} result Подходит ли строка по длине
 */

function checkMaxLengthString(verifiedString, maxLength = 56){
  return verifiedString.length <= maxLength;
}


/**
 * @param {*} first Предпочительно положительное число
 * @param {*} second Предпочительно положительное число
 * @returns {number} Случайное целое число в заданном промежутке включительно или `NaN`, если аргументы не подходящие
 */
function getRandomIntegerWithChecks(first, second) {
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

  return getRandomInteger (first, second);
}

/**
 * На основе материала {@link https://learn.javascript.ru/task/random-int-min-max| Learn JS}
@param {number} from Целое положительное число
@param {number} to Целое положительное число, которое больше предыдущего
@returns {number} Случайное число в заданном промежутке включительно
*/
function getRandomInteger(from, to) {
  const randomNumber = from + Math.random() * (to + 1 - from);
  return Math.floor (randomNumber);
}
