import { htmlEntities } from '../utils.js';
import { AppStorage } from './AppStorage.js';

const storage = new AppStorage();

class Task {
	static toName(desc) {
		return String(desc).replaceAll('\n', ' ').trim().substring(0, 18).trim();
	}

	static toDesc(desc) {
		return String(desc).trim();
	}

	/**
	 * @param tasks {Tasks}
	 * @param id {number}
	 * @param desc {string}
	 * @param completed {boolean | undefined}
	 * */
	constructor(tasks, { id, desc, completed, }) {
		this.id        = Number(id);
		this.name      = Task.toName(desc);
		this.desc      = Task.toDesc(desc);
		this.completed = !!completed;

		/** @type {Tasks} */
		this.tasks = tasks;

		/** @type {HTMLDivElement} */
		this.$elm = this.createElement();
		this.updateHtml();

		this.tasks.list.set(this.id, this);
	}

	// Для хранения в Storage
	toJSON() {
		return {
			id: this.id,
			desc: this.desc,
			completed: this.completed,
		};
	}

	fnEventClick = (event) => {
		/** @type {HTMLElement | null} */
		const elmTarget = event.target;
		if (!elmTarget || !this.tasks) {
			return;
		}

		try {
			// Удаление задачи
			if (elmTarget.classList.contains('s-remove')) {
				event.preventDefault();
				if (confirm('Вы действительно хотите удалить эту задачу?')) {
					this.destroy();
				}
				return;
			}

			// Изменение статуса задачи
			if (elmTarget.classList.contains('s-mark')) {
				event.preventDefault();
				this.toggleDone();
				return;
			}

			// Начать редактирование задачи
			if (elmTarget.classList.contains('s-edit')) {
				event.preventDefault();
				this.startEdit();
				return;
			}

			// Сохранить изменения при редактировании задачи
			if (elmTarget.classList.contains('s-save')) {
				event.preventDefault();
				this.saveEdit();
			}
		} catch (e) {
			alert(e.message || 'При выполнении действия произошла ошибка');
		}
	};
	fnEventDblClick = (event) => {
		/** @type {HTMLElement | null} */
		const elmTarget = event.target;
		if (!elmTarget || !this.tasks) {
			return;
		}

		try {
			// Начать редактирование по двойному клику (по описанию задачи)
			if (elmTarget.classList.contains('task__desc')) {
				event.preventDefault();
				this.startEdit();
			}
		} catch (e) {
			alert(e.message || 'При выполнении действия произошла ошибка');
		}
	};

	destroy() {
		if (this.$elm) {
			this.$elm.removeEventListener('click', this.fnEventClick);
			this.$elm.removeEventListener('dblclick', this.fnEventDblClick);
			this.$elm.remove();
		}

		this.tasks.list.delete(this.id);
		this.tasks.save();

		this.$elm  = null;
		this.tasks = null;
	}

	/** @return HTMLDivElement */
	createElement() {
		const $elm = document.createElement('article');
		$elm.classList.add('task');
		$elm.setAttribute('data-id', String(this.id));
		$elm.addEventListener('click', this.fnEventClick)
		$elm.addEventListener('dblclick', this.fnEventDblClick)
		return $elm;
	}

	updateHtml() {
		if (!this.$elm) {
			return;
		}

		const markButton = this.isDone()
			? `<button class="task__button s-mark">✖ Отметить невыполненной</button>`
			: `<button class="task__button s-mark">✔ Отметить выполненной</button>`;

		this.$elm.innerHTML = `
			<div class="task__ident">
				<div class="task__status${this.isDone() ? ' task__status-done' : ''}">[${this.getStatusName()}]</div>
				<div class="task__name${this.isDone() ? ' task__name-done' : ''}">${this.getNameInner()}</div>
			</div>
			<div class="task__content">
				<p class="task__desc">${this.getDescInner()}</p>
				<textarea class="task__edit input-theme"></textarea>
			</div>
			<div class="task__buttons">
				${markButton}
				<button class="task__button s-edit">✏️ Изменить</button>
				<button class="task__button hide s-save">💾 Сохранить</button>
				<button class="task__button s-remove">🗑️ Удалить</button>
			</div>
		`;
	}

	updateStatusByFilter() {
		if (!this.$elm) {
			return;
		}

		const typeFilter = this.tasks.getTypeFilter();
		if (typeFilter === 'done' && !this.isDone()) {
			this.$elm.classList.add('hide');
			return;
		}

		if (typeFilter === 'undone' && this.isDone()) {
			this.$elm.classList.add('hide');
			return;
		}

		// нет фильтра, показываем любую задачу
		if (this.$elm.classList.contains('hide')) {
			this.$elm.classList.remove('hide');
		}
	}

	getName() {
		return this.name;
	}

	getNameInner() {
		return htmlEntities(this.name);
	}

	getDesc() {
		return this.desc;
	}

	getDescInner() {
		return htmlEntities(this.desc).replaceAll('\n', '<br />');
	}

	getStatusName() {
		return this.completed ? 'Выполнена' : 'Не выполнена';
	}

	getElm() {
		return this.$elm;
	}

	isDone() {
		return this.completed;
	}

	toggleDone() {
		if (this.isDone()) {
			this.undone();
		} else {
			this.done();
		}
	}

	done() {
		this.completed = true;
		this.updateHtml();
		this.updateStatusByFilter();
		this.tasks.save();
	}

	undone() {
		this.completed = false;
		this.updateHtml();
		this.updateStatusByFilter();
		this.tasks.save();
	}

	updateDesc(desc) {
		if (typeof desc !== 'string') {
			throw new Error('Вы ввели некорректную задачу');
		}

		const descValue = Task.toDesc(desc);
		if (!descValue) {
			throw new Error('Вы не ввели задачу');
		}

		this.name = Task.toName(descValue);
		this.desc = descValue;


		const elmName = this.$elm.querySelector('.task__desc');
		const elmDesc = this.$elm.querySelector('.task__desc');

		if (elmName && elmDesc) {
			elmName.innerHTML = this.getNameInner();
			elmDesc.innerHTML = this.getDescInner();
		}

		this.tasks.save();
	}

	startEdit() {
		if (!this.$elm) {
			return;
		}

		const desc    = this.$elm.querySelector('.task__desc');
		const edit    = this.$elm.querySelector('.task__edit');
		const btnEdit = this.$elm.querySelector('.s-edit');
		const btnSave = this.$elm.querySelector('.s-save');

		if (!edit || !desc) {
			return;
		}

		edit.value = this.desc;
		edit.style.minHeight = desc.clientHeight + 'px';

		edit.classList.add('show');
		desc.classList.add('hide');
		btnEdit?.classList.add('hide');
		btnSave?.classList.remove('hide');

		setTimeout(() => edit.focus(), 0);
	}

	saveEdit() {
		if (!this.$elm) {
			return;
		}

		const desc    = this.$elm.querySelector('.task__desc');
		const edit    = this.$elm.querySelector('.task__edit');
		const btnEdit = this.$elm.querySelector('.s-edit');
		const btnSave = this.$elm.querySelector('.s-save');

		if (!edit || !edit.value) {
			throw new Error('Вы ввели некорректную задачу');
		}

		if (edit.value !== desc.textContent) {
			this.updateDesc(edit.value);
		}

		edit.value = '';
		edit.classList.remove('show');
		desc?.classList.remove('hide');
		btnEdit?.classList.remove('hide');
		btnSave?.classList.add('hide');
	}
}

export class Tasks {

	/**
	 * @param $elmDiv {HTMLDivElement}
	 * */
	constructor($elmDiv) {
		/** @type {HTMLDivElement} */
		this.$elm = $elmDiv;

		/** @type {'all' | 'done' | 'undone' | null} */
		this.typeFilter = null;

		/** @type {Map<number, Task>} */
		this.list = new Map();
		this.nextId = 0;
		this.actionSave = false;
	}

	restore() {
		const id   = Number(storage.get('tasks_next_id'));
		const data = storage.getJson('tasks');

		if (!data || !Array.isArray(data)) {
			return;
		}

		this.nextId = Number.isNaN(id) ? this.nextId : id;
		for (const taskData of data) {
			if (typeof taskData !== 'object') {
				continue;
			}

			const task = new Task(this, taskData);
		}

		this.render();
	}

	save() {
		if (this.actionSave) {
			return;
		}

		this.actionSave = true;
		queueMicrotask(() => {
			this.actionSave = false;
			storage.addJson('tasks', [...this.list.values()]);
			storage.add('tasks_next_id', this.nextId);
		});
	}

	add(descValue) {
		if (typeof descValue !== 'string') {
			throw new Error('Вы ввели некорректную задачу');
		}

		const desc = Task.toDesc(descValue);
		if (!desc) {
			throw new Error('Вы не ввели задачу');
		}

		const id   = ++this.nextId;
		const task = new Task(this, {
			id,
			desc,
		});

		this.$elm.prepend(task.getElm());

		// Обновляем отображение задачи, если установлен фильтр
		task.updateStatusByFilter();

		this.save();
		return task;
	}

	remove(idOrName) {
		if (idOrName && typeof idOrName === 'string') {
			const task = this.findByName(idOrName);
			if (task) {
				task.destroy();
				return;
			}
		}

		const id = Number(idOrName);
		if (Number.isNaN(id) || !this.list.has(id)) {
			throw new Error('Не удалось найти задачу');
		}

		const task = this.list.get(id);
		task.destroy();
		return true;
	}

	/** @return {'all' | 'done' | 'undone' | null} */
	getTypeFilter() {
		return this.typeFilter;
	}

	/** @param type {'all' | 'done' | 'undone' | null} */
	changeTypeFilter(type) {
		this.typeFilter = type;
		this.list.forEach(task => task.updateStatusByFilter());
	}

	findByName(name) {
		const findName = Task.toName(name).toLowerCase();
		for (const task of this.list.values()) {
			if (task.getName().toLowerCase() === findName) {
				return task;
			}
		}

		return null;
	}

	render() {
		const allTasks = [ ...this.list.values() ].map(task => task.getElm()).filter(Boolean);
		if (!allTasks || !allTasks.length) {
			this.$elm.innerHTML = '';
			return;
		}

		this.$elm.append(...allTasks);
	}
}
