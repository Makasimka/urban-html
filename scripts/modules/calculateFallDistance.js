import { declension, htmlEntities } from './utils.js';


export function calculateFallDistance(acceleration, timeFall) {
	acceleration = Number(acceleration);
	if (Number.isNaN(acceleration)) {
		throw new Error('Значение для ускорения сводного падения должно быть числом');
	}

	timeFall = Number(timeFall);
	if (Number.isNaN(timeFall)) {
		throw new Error('Значение для времени падения должно быть числом');
	}

	return (acceleration * timeFall ** 2) / 2;
}

/**
 * @param result {HTMLDivElement}
 * @param formData {FormData}
 * */
export function calculateFallDistanceBind(result, formData) {
	const timeFall     = htmlEntities(formData.get('time_fall'));
	const acceleration = htmlEntities(formData.get('acceleration') || '9.8');
	const resultValue  = calculateFallDistance(acceleration, timeFall);

	result.innerHTML = `Пройденный путь за ${timeFall} ${declension(timeFall, ['секунду', 'секунды', 'секунд'])} свободного падения: ${resultValue} ${declension(resultValue, ['метр', 'метра', 'метров'])}.`;
}
