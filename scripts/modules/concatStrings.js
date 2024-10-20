import { htmlEntities } from './utils.js';

export function concatStrings(isDebug, ...strings) {
	const string = strings.reduce((value, curString, key) => {
		if (isDebug) {
			return `${value}${key ? ',' : ''} Слово (${key + 1}) — «${htmlEntities(curString)}»`;
		}

		return `${value} ${htmlEntities(curString)}`;
	}, '');
	return string.trimStart();
}


/**
 * @param result {HTMLDivElement}
 * @param formData {FormData}
 * */
export function concatStringsBind(result, formData) {
	const textDebug = concatStrings(true, ...formData.values());
	const textFull  = concatStrings(false, ...formData.values());
	result.innerHTML = `
		${textDebug}
		<br /><br />
		Результат: ${textFull}
	`;
}
