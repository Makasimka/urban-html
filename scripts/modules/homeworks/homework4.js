import { bindForm } from '../utils.js';
import { greetBind } from '../greet.js';
import { concatStringsBind } from '../concatStrings.js';
import { celsiusToFahrenheitBind } from '../celsiusToFahrenheit.js';
import { calculateFallDistanceBind } from '../calculateFallDistance.js';
import { calculateAverageBind } from '../calculateAverage.js';


window.addEventListener('load', () => {
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
});
