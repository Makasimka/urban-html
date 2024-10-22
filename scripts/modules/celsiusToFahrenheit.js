import { toFormatDeg, anyStringToNumberString } from './utils.js';

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
 * @param result {HTMLDivElement}
 * @param formData {FormData}
 * */
export function celsiusToFahrenheitBind(result, formData) {
	const value   = (formData.get('celsius') || '').trim();
	const isMinus = [ '-', '—', '−', ].includes(value.charAt(0));
	const celsius = anyStringToNumberString(value);

	const resultVal  = celsiusToFahrenheit(celsius, isMinus);
	result.innerHTML = `${toFormatDeg(celsius, isMinus)} °C = ${toFormatDeg(resultVal, isMinus)} °F`;
}
