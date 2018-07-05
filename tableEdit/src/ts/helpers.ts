class EventEmitter {
	public events: Events;
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

function createElement(name: string, innerText: string|null = null , attributes?: Attributes): HTMLElement {
	let element: HTMLElement = document.createElement(name);
	element.innerText = innerText;
	for (let attr in attributes) {
		element.setAttribute(attr,attributes[attr]);
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
	id?: number;
	value?: string;
	disabled?: boolean;
};
type DataModel = {
	store?: Store[];
	count?: number;
	row?: number;
	col?: number;
};
type Events = {
	[type: string]: Array<Function>;
};

type Attributes = {
	[type: string]: string;
};

export { EventEmitter, save, load, createElement, Store, DataModel };
