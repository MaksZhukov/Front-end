class EventEmitter {
	public events: object;
	constructor() {
		this.events = {};
	}
	on(type: string, callback: Function): void {
		this.events[type] = this.events[type] || [];
		this.events[type].push(callback);
	}
	emit(type: string, arg: object): void {
		if (this.events[type]) {
			this.events[type].forEach(callback => callback(arg));
		}
	}
}

function createElement(name: string, attributes?: object): HTMLElement{
	let element: HTMLElement = document.createElement(name);
	for (let attr in attributes) {
		element[attr] = attributes[attr];
	}
	return element;
}

function save(data: DataModel): void {
	localStorage.setItem('data', JSON.stringify(data));
}
function load(): DataModel {
	return JSON.parse(localStorage.getItem('data'));
}

type Store = {
	id: number;
	value: string;
	disabled: boolean;
};
type DataModel = {
	store: Store[];
	count?: number;
	row: number;
	col: number;
};

type Elements = HTMLElement|HTMLInputElement|HTMLTableElement;

export { EventEmitter, save, load, createElement, Store, DataModel };
