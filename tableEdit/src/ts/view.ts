import { EventEmitter, createElement, Store } from './helpers';

class View extends EventEmitter {
	private app: HTMLElement;
	private button: HTMLElement;
	private inputRow: HTMLInputElement;
	private inputCol: HTMLInputElement;
	private table: HTMLTableElement;
	constructor() {
		super();
		this.app = document.getElementById('app');
		this.button = createElement('button','Создать таблицу');
		this.button.addEventListener('click', this.handlerClickButton.bind(this));
		this.inputRow = <HTMLInputElement>createElement('input', null, { placeholder: 'Количество строк' });
		this.inputCol = <HTMLInputElement>createElement('input',null, {
			placeholder: 'Количество столбцов'
		});
		this.app.appendChild(this.button);
		this.app.appendChild(this.inputRow);
		this.app.appendChild(this.inputCol);
	}
	createTable(row: number, col: number, store: Store[]) {
		this.inputRow.value = row.toString();
		this.inputCol.value = col.toString();
		if (this.table) {
			this.table.remove();
		}
		this.table = <HTMLTableElement>createElement('table');
		const tbody: HTMLElement = createElement('tbody');
		let id: number = 0;
		this.table.appendChild(tbody);
		for (let i: number = 0; i < row; i++) {
			let tr = createElement('tr');
			for (let j: number = 0; j < col; j++) {
				let td = createElement('td');
				let input:HTMLInputElement = <HTMLInputElement>createElement('input');
				input.dataset.id = store.filter(input => input.id === id)[0].id.toString();
				input.value = store.filter(input => input.id === id)[0].value;
				input.classList.add('disabled');
				input.readOnly = true;
				input.addEventListener('click', this.handlerClickInput.bind(this));
				input.addEventListener('blur', this.handlerBlurInput.bind(this));
				input.addEventListener('keyup', this.handlerKeyUpInput.bind(this));
				td.appendChild(input);
				tr.appendChild(td);
				id++;
			}
			tbody.appendChild(tr);
		}
		this.table = this.table;
		this.app.appendChild(this.table);
	}
	handlerClickButton() {
		this.emit('clickButton', {
			row: this.inputRow.value,
			col: this.inputCol.value
		});
	}
	handlerClickInput({ target }:{target:HTMLElement}) {
		this.emit('click', { id: target.dataset.id });
	}
	handlerBlurInput({ target }:{target:HTMLElement}) {
		this.emit('blur', { id: target.dataset.id });
	}
	handlerKeyUpInput({ target }:{target:HTMLInputElement}) {
		this.emit('keyup', { id: target.dataset.id, value: target.value });
	}
	updateClickInput({ id, disabled }:Store) {
		const input: HTMLInputElement = this.getInputById(id);
		if (disabled === false) {
			input.classList.replace('disabled', 'enabled');
			input.readOnly = disabled;
		}
	}
	updateBlurInput({ id, disabled }:Store) {
		const input: HTMLInputElement = this.getInputById(id);
		if (disabled === true) {
			input.classList.replace('enabled', 'disabled');
			input.readOnly = disabled;
		}
	}
	updateKeyUpInput({ id, value }:Store) {
		const input: HTMLInputElement = this.getInputById(id);
		input.value = value;
	}
	getInputById(id:number): HTMLInputElement {
		return document.querySelector(`[data-id="${id}"]`);
	}
}

export default View;
