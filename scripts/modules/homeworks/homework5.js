import { Tasks } from "../classes/Tasks.js";
import { bindForm } from "../utils.js";

// Визуальное расширение
window.addEventListener("load", () => {
	const formTask     = document.getElementById('form_task');
	const tasksList    = document.getElementById('tasks_list');
	const tasksButtons = document.getElementById('tasks_buttons');

	if (!tasksList || !formTask || !tasksButtons) {
		return;
	}

	const tasks = new Tasks(tasksList);
	tasks.restore();

	bindForm(formTask, (form) => {
		const desc = form.get('task_desc');
		if (tasks.add(desc)) {
			return 'Задача успешно добавлена';
		}
	});

	let lastTargetButton;
	tasksButtons.addEventListener('click', (event) => {
		const elmTarget = event.target;
		if (!elmTarget) {
			return;
		}

		let typeFilter;
		if (elmTarget.classList.contains('s-show-all')) {
			typeFilter = 'all';
		} else if (elmTarget.classList.contains('s-show-done')) {
			typeFilter = 'done';
		} else if (elmTarget.classList.contains('s-show-undone')) {
			typeFilter = 'undone';
		}

		if (typeFilter) {
			event.preventDefault();

			if (elmTarget.classList.contains('active')) {
				tasks.changeTypeFilter(null);
				elmTarget.classList.remove('active');
				lastTargetButton = undefined;
			} else {
				tasks.changeTypeFilter(typeFilter);
				elmTarget.classList.add('active');
				lastTargetButton?.classList.remove('active');
				lastTargetButton = elmTarget;
			}
		}
	});
});
