class EventEmitter {
	constructor() {
		this.events = {};
	}
	on(type, callback) {
		this.events[type] = this.events[type] || [];
		this.events[type].push(callback);
	}
	emit(type, arg) {
		if (this.events[type]) {
			this.events[type].forEach(callback => callback(arg));
		}
	}
}

function save(data) {
	localStorage.setItem('data', JSON.stringify(data));
}
function load() {
	return JSON.parse(localStorage.getItem('data'));
}

export { EventEmitter, save, load };
