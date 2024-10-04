function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function bindForm(form) {
	form.addEventListener('submit', (e) => {
		const elm = document.getElementById('comments_list');
		if (!elm) {
			return;
		}

		e.preventDefault();
		const data = new FormData(form);
		let tpl    = '';
		tpl += `<div class="user-info"><b>${htmlEntities(data.get('user_name') || data.get('user_surname'))}</b> <small>(${data.get('user_email') || 'address@mail.ru'})</small></div>`;
		tpl += `<p>${htmlEntities(data.get('user_comment') || '...')}</p>`;
		tpl += `<div class="datetime"><time>${new Date().toLocaleString()}</time></div>`;
		elm.innerHTML = `<article class="information-in block-margin">${tpl}</article>` + elm.innerHTML;
		form.reset();
	});
}

window.addEventListener('load', () => {
	const elm = document.getElementById('form_comments');
	if (elm) {
		bindForm(elm);
	}
});
