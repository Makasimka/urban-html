export class AppStorage {
	/** @param storageInit {Storage} */
	constructor(storageInit = localStorage) {
		/** @type Storage */
		this.storage = storageInit;
	}

	add(key, value) {
		this.storage.setItem(key, value);
	}

	addJson(key, value) {
		this.add(key, JSON.stringify(value));
	}

	get(key) {
		return this.storage.getItem(key);
	}

	getJson(key) {
		try {
			const data = this.get(key);
			if (!data) {
				return null;
			}

			return JSON.parse(data);
		} catch (e) {
			console.error(e);
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
