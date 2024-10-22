export function toFormatDeg(value, isMinus) {
	let formatValue = String(Math.abs(value));
	formatValue = formatValue.replace(/\./g, ',');
	return `${isMinus ? '−' : ''}${formatValue}`;
}

// Пытаемся сделать из строки, числовую строку
export function anyStringToNumberString(value) {
	if (!value) {
		return '';
	}

	let formatValue = value
	.replace(/[^0-9,.]+/g, '')
	.replace(/,+/g, '.')
	.replace(/\.+/g, '.');

	return formatValue.trim();
}

export function htmlEntities(string) {
	if (!string) {
		return '';
	}

	return String(string)
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/"/g, '&quot;');
}

/**
 * @param amountVal {number}
 * @param titles {string[]}
 * @return {string}
 * */
export function declension(amountVal, titles) {
	let amount  = Number(amountVal);
	const cases = [2, 0, 1, 1, 1, 2];

	if (amount === 0 || Number.isNaN(amount)) {
		amount = 5;
	}

	if (!titles.length) {
		throw new Error('[declension] Попытка передать пустой массив данных');
	}

	amount = Math.abs(Math.floor(amount));
	const key = ((amount % 100 > 4 && amount % 100 < 20) ? 2 : cases[((amount % 10 < 5) ? amount % 10 : 5)]) || 0;
	return (titles[key] || titles[0]);
}
