import { Tasks } from "../classes/Tasks.js";
import { bindForm } from "../utils.js";

// Визуальное расширение
window.addEventListener("load", () => {
	const formUserName  = document.getElementById('form_user_name');
	const greetUserName = document.getElementById('greet_user_name');

	if (formUserName && greetUserName) {
		const userName = localStorage.getItem('user_name');
		if (userName) {
			greetUserName.innerText = `${userName}, доброго времени суток!`;

			formUserName.classList.add('block-hide');
			greetUserName.classList.remove('block-hide');
		}

		bindForm(formUserName, (form) => {
			const newUserName = (form.get('user_name') || '').trim();
			if (!newUserName) {
				throw new Error('Вы не ввели имя')
			}

			localStorage.setItem('user_name', newUserName);
			return `${newUserName}, доброго времени суток! Ваше имя сохранено на этом сайте.`;
		});
	}

	const formTask     = document.getElementById('form_task');
	const tasksList    = document.getElementById('tasks_list');
	const tasksButtons = document.getElementById('tasks_buttons');

	if (tasksList && formTask && tasksButtons) {
		const tasks = new Tasks(tasksList, tasksButtons);
		tasks.restore();

		bindForm(formTask, (form) => {
			const desc = form.get('task_desc');
			if (tasks.add(desc)) {
				return 'Задача успешно добавлена';
			}
		});
	}
});
