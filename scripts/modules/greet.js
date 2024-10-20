import { htmlEntities } from './utils.js';

export function greet(name) {
	return name ? `Hello, ${name}!` : `Hello!`;
}

/**
 * @param result {HTMLDivElement}
 * @param formData {FormData}
 * */
export function greetBind(result, formData) {
	const userName = htmlEntities(formData.get('user_name'));
	result.innerHTML = greet(userName);
}
