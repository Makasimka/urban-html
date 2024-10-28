import { htmlEntities } from '../utils.js';

class Task {
	static toName(desc) {
		return String(desc).trim().substring(0, 18).trim();
	}

	constructor(desc) {
		this.name = Task.toName(desc);
		this.desc = String(desc ?? '');
		this.completed = false;
	}

	getName() {
		return this.name;
	}

	getDesc() {
		return this.desc;
	}

	getStatusName() {
		return this.completed ? 'Выполнена' : 'Не выполнена';
	}

	getText() {
		return `[${this.getStatusName()}] ${htmlEntities(this.getDesc())}`;
	}

	getHtml(index) {
		const markButton = this.isDone()
			? `<button class="task__button task__button-undone s-mark">✖ Отметить невыполненной</button>`
			: `<button class="task__button task__button-done s-mark">✔ Отметить выполненной</button>`;

		return `
		<article class="task" data-id="${index}">
			<div class="task__ident">
				<div class="task__status${this.isDone() ? ' task__status-done' : ''}">[${this.getStatusName()}]</div>
				<div class="task__name">${htmlEntities(this.getName())}</div>
			</div>
			<p class="task__desc">${htmlEntities(this.getDesc())}</p>
			<div class="task__buttons">
				${markButton}
				<button class="task__button task__button-remove s-remove">🗑️ Удалить</button>
			</div>
		</article>
		`;
	}

	isDone() {
		return this.completed;
	}

	done() {
		this.completed = true;
	}

	undone() {
		this.completed = false;
	}
}

export class Tasks {
	constructor() {
		/**@type {Task[]}*/
		this.list = [];
	}

	get(index) {
		return this.list[index];
	}

	has(index) {
		return !!this.list[index];
	}

	add(desc) {
		if (typeof desc !== 'string') {
			throw new Error('Вы ввели некорректную задачу');
		}

		const descValue = desc.trim();
		if (!descValue) {
			throw new Error('Вы не ввели задачу');
		}

		const task = new Task(descValue);
		this.list.push(task);
		return task;
	}

	findByName(name) {
		const findName = Task.toName(name).toLowerCase();
		return this.list.findIndex(task => task.getName().toLowerCase() === findName);
	}

	remove(index) {
		if (!this.has(index)) {
			throw new Error('Не удалось найти задачу');
		}

		this.list.splice(index, 1);
		return true;
	}

	removeByName(name) {
		const index = this.findByName(name);

		if (index === -1) {
			throw new Error(`Не удалось найти задачу с названием "${htmlEntities(name)}"`);
		}

		return this.remove(index);
	}

	toggleDone(index) {
		if (!this.has(index)) {
			throw new Error('Не удалось найти задачу');
		}

		const task = this.get(index);

		if (task.isDone()) {
			task.undone();
		} else {
			task.done();
		}

		return true;
	}

	markDone(index) {
		if (!this.has(index)) {
			throw new Error('Не удалось найти задачу');
		}

		const task = this.get(index);
		task.done();

		return true;
	}

	markDoneByName(name) {
		const index = this.findByName(name);

		if (index === -1) {
			throw new Error(`Не удалось найти задачу с названием "${htmlEntities(name)}"`);
		}

		return this.markDone(index);
	}

	showAllText() {
		return this.list.reduce((str, task) => `${task.getText()}\n${str}`, '');
	}

	showAllHtml() {
		return this.list.reduce((str, task, index) => `${task.getHtml(index)}${str}`, '');
	}
}
