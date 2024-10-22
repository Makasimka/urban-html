import { toFormatDeg, anyStringToNumberString } from './utils.js';

/**
 * @param celsius {string | number}
 * @param isMinus {undefined | boolean}
 * @return {number}
 * */
export function celsiusToFahrenheit(celsius, isMinus) {
	if (celsius === '') {
		throw new Error('Значение для градусов Цельсия должно быть корректным числом');
	}

 	celsius = Number(celsius);
	if (Number.isNaN(celsius)) {
		throw new Error('Значение для градусов Цельсия должно быть корректным числом');
	}

	// Нужна ли обработка отрицательных чисел? Если передан булев параметр isMinus, то обрабатываем.
	celsius = isMinus !== undefined ? Math.abs(celsius) : celsius;
	celsius = isMinus ? -celsius : celsius;

	return (celsius * 9 / 5) + 32;
}

/**
 * @param formData {FormData}
 * @return {string}
 * */
export function celsiusToFahrenheitBind(formData) {
	const value   = (formData.get('celsius') || '').trim();
	const isMinus = [ '-', '—', '−', ].includes(value.charAt(0));
	const celsius = anyStringToNumberString(value);

	const resultVal  = celsiusToFahrenheit(celsius, isMinus);
	return `${toFormatDeg(celsius, isMinus)} °C = ${toFormatDeg(resultVal, isMinus)} °F`;
}
