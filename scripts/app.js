function htmlEntities(str) {
	return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function addComment(uName, uEmail, uComment) {
	const elm = document.getElementById('comments_list');
	if (!elm) {
		return;
	}

	uName    = htmlEntities(uName || 'Anonymous').trim();
	uEmail   = htmlEntities(uEmail|| 'address@mail.ru').trim();
	uComment = htmlEntities(uComment).trim();

	if (!uComment) {
		return;
	}

	let tpl = '';
	tpl += `<div class="user-info"><b>${uName}</b> <small>(<a href="mailto:${uEmail}">${uEmail}</a>)</small></div>`;
	tpl += `<p>${uComment}</p>`;
	tpl += `<div class="datetime"><time>${new Date().toLocaleString()}</time></div>`;
	elm.innerHTML = `<article class="information-in block-margin">${tpl}</article>` + elm.innerHTML;
}

function bindForm(form) {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const data = new FormData(form);
		addComment(
			data.get('user_name') || data.get('user_surname'),
			data.get('user_email'),
			data.get('user_comment'),
		);
		form.reset();
	});
}

window.addEventListener('load', () => {
	const elm = document.getElementById('form_comments');
	if (elm) {
		bindForm(elm);
	}
});
