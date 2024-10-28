import { Tasks } from "../classes/Tasks.js";
import { bindForm } from "../utils.js";

// ДЗ
try {
	const tasks = new Tasks();

	tasks.add(`Выучить JavaScript`);
	tasks.add(`Купить продукты`);
	tasks.add(`Сделать домашнее задание`);

	console.log(tasks.showAllText());

	tasks.markDoneByName(`Купить продукты`);
	tasks.removeByName(`Сделать домашнее задание`);

	console.log(tasks.showAllText());

	tasks.removeByName(`Несуществующая задача`);
} catch (error) {
	console.warn(error.message || '');
}

// Визуальное расширение
window.addEventListener("load", () => {
	const tasks     = new Tasks();
	const formGreet = document.getElementById('form_task');
	const tasksList = document.getElementById('tasks_list');

	if (!tasksList || !formGreet) {
		return;
	}

	const renderTasks = () => {
		tasksList.innerHTML = tasks.showAllHtml();
	}

	tasksList.addEventListener('click', (event) => {
		const elm = event.target;
		if (!elm) {
			return;
		}

		try {
			const parent = elm.parentElement?.parentElement;

			// Обработка кнопки удаления задачи
			if (parent && elm.classList.contains('s-remove')) {
				event.preventDefault();

				const index = Number(parent.getAttribute('data-id'));
				if (!Number.isNaN(index) && tasks.remove(index)) {
					renderTasks();
				}

				return;
			}

			// Обработка кнопки изменения статуса задачи
			if (parent && elm.classList.contains('s-mark')) {
				event.preventDefault();

				const index = Number(parent.getAttribute('data-id'));
				if (!Number.isNaN(index) && tasks.toggleDone(index)) {
					renderTasks();
				}

				return;
			}
		} catch (e) {
			if (e.message) {
				alert(e.message);
			}
		}
	});

	bindForm(formGreet, (form) => {
		const desc = form.get('task_desc');

		if (tasks.add(desc)) {
			renderTasks();
			return 'Задача успешно добавлена';
		}
	});
});
