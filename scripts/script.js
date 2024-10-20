import { greet, greetBind } from './modules/greet.js';
import { concatStringsBind } from './modules/concatStrings.js';
import { celsiusToFahrenheitBind } from './modules/celsiusToFahrenheit.js';
import { calculateFallDistanceBind } from './modules/calculateFallDistance.js';
import { calculateAverageBind } from './modules/calculateAverage.js';

// Первая задача:
const myName = 'Maxim';
console.log(greet(myName));

// Визуальное дополнение от меня
function bindForm(form, fnSubmit) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const result = form.getElementsByClassName('form__result')[0];
		if (!result) {
			form.reset();
			return;

		}

		try {
			result.classList.remove('invalid');
			fnSubmit?.(result, new FormData(form));
		} catch (error) {
			console.log(error);

			result.classList.add('invalid');
			result.innerHTML = `Ошибка: ${error.message}`;
		} finally {
			form.reset();
		}
	});
}

function bindWindow() {
	const formGreet        = document.getElementById('form_greet');
	const formCelsius      = document.getElementById('form_celsius');
	const formFallDistance = document.getElementById('form_fall_distance');
	const formNumberAvg    = document.getElementById('form_number_avg');
	const formConcatStr    = document.getElementById('form_concat_str');

	bindForm(formGreet, greetBind);
	bindForm(formCelsius, celsiusToFahrenheitBind);
	bindForm(formFallDistance, calculateFallDistanceBind);
	bindForm(formNumberAvg, calculateAverageBind);
	bindForm(formConcatStr, concatStringsBind);
}

window.addEventListener('load', bindWindow);
