import { greetBind } from './greet.js';
import { concatStringsBind } from './concatStrings.js';
import { celsiusToFahrenheitBind } from './celsiusToFahrenheit.js';
import { calculateFallDistanceBind } from './calculateFallDistance.js';
import { calculateAverageBind } from './calculateAverage.js';

function bindForm(form, fnSubmit) {
	if (!form) {
		return;
	}

	form.addEventListener('submit', (event) => {
		event.preventDefault();

		const resultHtml = form.getElementsByClassName('form__result')[0];
		if (!resultHtml) {
			form.reset();
			return;
		}

		try {
			resultHtml.classList.remove('invalid');
			const resultVal = fnSubmit?.(new FormData(form));

			if (typeof resultVal === 'string' && resultVal) {
				resultHtml.innerHTML = resultVal;
			} else {
				throw new Error('Функция не вернула результат');
			}
		} catch (error) {
			console.error(error);

			resultHtml.classList.add('invalid');
			resultHtml.innerHTML = `Ошибка: ${error.message}`;
		} finally {
			form.reset();
		}
	});
}

export function bindWindow() {
	const formGreet = document.getElementById('form_greet');
	bindForm(formGreet, greetBind);

	const formCelsius = document.getElementById('form_celsius');
	bindForm(formCelsius, celsiusToFahrenheitBind);

	const formFallDistance = document.getElementById('form_fall_distance');
	bindForm(formFallDistance, calculateFallDistanceBind);

	const formNumberAvg = document.getElementById('form_number_avg');
	bindForm(formNumberAvg, calculateAverageBind);

	const formConcatStr = document.getElementById('form_concat_str');
	bindForm(formConcatStr, concatStringsBind);
}
