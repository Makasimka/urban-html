import { htmlEntities } from './utils.js';

/**
 * @param numbers {number | string}
 * @return {number}
 * */
export function calculateAverage(...numbers) {
	if (numbers.length < 2) {
		throw new Error('В функцию должно передаваться не менее двух аргументов');
	}

	const parseNumbers = numbers.map(num => Number(num));

	if (parseNumbers.some((v) => Number.isNaN(v))) {
		throw new Error('Все переданные значения должны быть числами');
	}

	const sum = parseNumbers.reduce((sum, number) => sum + number, 0);
	return sum / parseNumbers.length;
}

/**
 * @param formData {FormData}
 * @return {string}
 * */
export function calculateAverageBind(formData) {
	let numbers = (formData.get('numbers_str') || '').replace(/\s/g, '').split(',');
	numbers = numbers.map(num => htmlEntities(num).trim());

	const avg = calculateAverage(...numbers);
	const numStr = numbers.reduce((str, number, key) => {
		if (number.charAt(0) === '-') {
			return `${str}${key ? ' - ' : '-'}${number.replace('-', '')}`;
		}

		return `${str}${key ? ' + ' : ''}${number}`;
	}, '');

	return `
		Считаем значение заданных чисел: (${numStr}) / ${numbers.length}
		<br /><br />Результат: ${avg}
	`;
}
