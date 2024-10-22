import { declension, htmlEntities } from './utils.js';

/**
 * @param accelerationVal {number | string}
 * @param timeFallVal {number | string}
 * @return {number}
 * */
export function calculateFallDistance(accelerationVal, timeFallVal) {
	const acceleration = Number(accelerationVal);
	if (Number.isNaN(acceleration)) {
		throw new Error('Значение для ускорения сводного падения должно быть числом');
	}

	const timeFall = Number(timeFallVal);
	if (Number.isNaN(timeFall)) {
		throw new Error('Значение для времени падения должно быть числом');
	}

	return (acceleration * timeFall ** 2) / 2;
}

/**
 * @param formData {FormData}
 * @return {string}
 * */
export function calculateFallDistanceBind(formData) {
	const timeFall     = htmlEntities(formData.get('time_fall'));
	const acceleration = htmlEntities(formData.get('acceleration') || '9.8');
	const resultValue  = calculateFallDistance(acceleration, timeFall);

	return `Пройденный путь за ${timeFall} ${declension(timeFall, ['секунду', 'секунды', 'секунд'])} свободного падения: ${resultValue} ${declension(resultValue, ['метр', 'метра', 'метров'])}.`;
}
