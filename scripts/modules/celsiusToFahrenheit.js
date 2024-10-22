import { toFormatDeg, anyStringToNumberString } from './utils.js';

export function celsiusToFahrenheit(celsius, isMinus = false) {
	if (celsius === '') {
		throw new Error('Значение для градусов Цельсия должно быть корректным числом');
	}

 	celsius = Number(celsius);
	if (Number.isNaN(celsius)) {
		throw new Error('Значение для градусов Цельсия должно быть корректным числом');
	}

	celsius = Math.abs(celsius);

	if (isMinus) {
		celsius = -celsius;
	}

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
