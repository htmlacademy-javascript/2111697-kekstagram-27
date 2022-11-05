/**
 * Функция для проверки максимальной длины строки.
 * @param {string} verifiedString Входная строка
 * @param {number} [maxLength = 56] Максимальная длина*
 * @param {boolean} result Подходит ли строка по длине
 */

const checkMaxLengthString = (verifiedString, maxLength = 140) => verifiedString.length <= maxLength;

/**
 * @param {KeyboardEvent} evt
 */

const isEscapeKey = (evt) => evt.key === 'Escape';

export {isEscapeKey, checkMaxLengthString};
