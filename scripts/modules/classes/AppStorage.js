export class AppStorage {
	constructor(storageInit = localStorage) {
		/** @type Storage */
		this.storage = storageInit;
	}

	add(key, value) {
		this.storage.setItem(key, value);
	}

	addJson(key, value) {
		const json = JSON.stringify(value);
		this.add(key, json);
	}

	get(key) {
		return this.storage.getItem(key);
	}

	getJson(key) {
		try {
			const data = this.storage.getItem(key);
			if (!data) {
				return null;
			}

			return JSON.parse(data);
		} catch (e) {
			console.log(e);
			return null;
		}
	}

	delete(key) {
		this.storage.removeItem(key);
	}

	clear() {
		this.storage.clear();
	}

	size() {
		return this.storage.length;
	}
}
