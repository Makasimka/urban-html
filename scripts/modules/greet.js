import { htmlEntities } from './utils.js';

/**
 * @param name {string}
 * @return {string}
 * */
export function greet(name) {
	return name ? `Hello, ${name}!` : `Hello!`;
}

/**
 * @param formData {FormData}
 * @return {string}
 * */
export function greetBind(formData) {
	const userName = htmlEntities(formData.get('user_name'));
	return greet(userName);
}
