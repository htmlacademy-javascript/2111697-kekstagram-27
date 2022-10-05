/**
 * Функция для проверки максимальной длины строки.
 * @param {string} verifiedString Входная строка
 * @param {number} maxLength Максимальная длина
 * @param {boolean} Подходит ли строка по длине
 */

function checkMaxLengthString (verifiedString, maxLength = 56){
  return verifiedString.length <= maxLength;
}
checkMaxLengthString();
/**
 * Возвращает случайное число в заданном диапазоне и проверяет на типы и что числа положительные
 * @param {number} first Положительное число
 * @param {number} second Положительное число
 * @param {number} precision случайное число в заданном промежутке включительно
 */
function getRandomIntegerWithChecks(first, second) {
  if (typeof first === 'number' || typeof second === 'number') {
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

  return getRandomIntegerWithChecks(first, second);
}
getRandomIntegerWithChecks();
