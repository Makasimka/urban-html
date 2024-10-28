/**
 * @param value {string | number}
 * @param isMinus {boolean}
 * @return {string}
 **/
export function toFormatDeg(value, isMinus) {
	let formatValue = String(Math.abs(value));
	formatValue = formatValue.replace(/\./g, ',');
	return `${isMinus ? '−' : ''}${formatValue}`;
}

// Пытаемся сделать из строки, числовую строку
/** @return {string} */
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

/** @return {string} */
export function htmlEntities(string) {
	if (!string) {
		return '';
	}

	return String(string)
	.replace(/&/g, '&amp;')
	.replace(/</g, '&lt;')
	.replace(/>/g, '&gt;')
	.replace(/'/g, '&apos;')
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

/**
 * @param form {HTMLFormElement | null}
 * @param fnSubmit {(formData: FormData) => string | undefined}
 * @return {void}
 * */
export function bindForm(form, fnSubmit) {
	if (!form) {
		return;
	}

	const resultHtml = form.getElementsByClassName('form__result')[0];
	const viewResult = (data) => {
		if (!resultHtml) {
			return;
		}

		if (!data) {
			data = new Error('Функция не вернула результат');
		}

		if (typeof data === 'string') {
			resultHtml.classList.remove('invalid');
			resultHtml.innerHTML = data;
		} else if (data instanceof Error) {
			resultHtml.classList.add('invalid');
			resultHtml.innerHTML = `Ошибка: ${data.message}`;
		} else {
			resultHtml.classList.remove('invalid');
			resultHtml.innerHTML = '';
		}
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		try {
			const resultVal = fnSubmit?.(new FormData(form));
			viewResult(resultVal);
		} catch (error) {
			console.error(error);
			viewResult(error);
		} finally {
			form.reset();
		}
	});
}
