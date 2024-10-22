import { htmlEntities } from './utils.js';

/**
 * @param strings {string}
 * @return {[string, string]}
 * */
export function concatStrings(...strings) {
	let debugString = '';
	const string = strings.reduce((value, curString, key) => {
		debugString = `${debugString}${key ? ',' : ''} Слово (${key + 1}) — «${htmlEntities(curString)}»`;
		return `${value} ${htmlEntities(curString)}`;
	}, '');

	return [
		string.trimStart(),
		debugString
	];
}


/**
 * @param formData {FormData}
 * @return {string}
 * */
export function concatStringsBind(formData) {
	const [textFull, textDebug] = concatStrings(...formData.values());

	return `
		${textDebug}
		<br /><br />
		Результат: ${textFull}
	`;
}
