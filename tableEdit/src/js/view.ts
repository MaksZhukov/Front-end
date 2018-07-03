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
		this.button = createElement('button', { innerText: 'Создать таблицу' });
		this.button.addEventListener('click', this.handlerClickButton.bind(this));
		this.inputRow = <HTMLInputElement>createElement('input', { placeholder: 'Количество строк' });
		this.inputCol = <HTMLInputElement>createElement('input', {
			placeholder: 'Количество столбцов'
		});
		this.app.appendChild(this.button);
		this.app.appendChild(this.inputRow);
		this.app.appendChild(this.inputCol);
	}
	createTable(row: number, col: number, store: Store[]) {
		this.inputRow.value = row.toString();
		this.inputCol.value = col.toString();
		this.table = <HTMLTableElement>createElement('table');
		const tbody: HTMLElement = createElement('tbody');
		let id: number = 0;
		this.table.appendChild(tbody);
		for (let i: number = 0; i < row; i++) {
			let tr = createElement('tr');
			for (let j: number = 0; j < col; j++) {
				let td = createElement('td');
				let input:HTMLInputElement = <HTMLInputElement>createElement('input');
				input.dataset.id = store.find(input => input.id === id).id.toString();
				input.value = store.find(input => input.id === id).value;
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
		if (this.table) {
			this.table.remove();
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
	handlerClickInput({ target }) {
		this.emit('click', { id: target.dataset.id });
	}
	handlerBlurInput({ target }) {
		this.emit('blur', { id: target.dataset.id });
	}
	handlerKeyUpInput({ target }) {
		this.emit('keyup', { id: target.dataset.id, value: target.value });
	}
	updateClickInput({ id, disabled }) {
		const input: HTMLInputElement = this.getInputById(id);
		if (disabled === false) {
			input.classList.replace('disabled', 'enabled');
			input.readOnly = disabled;
		}
	}
	updateBlurInput({ id, disabled }) {
		const input: HTMLInputElement = this.getInputById(id);
		if (disabled === true) {
			input.classList.replace('enabled', 'disabled');
			input.readOnly = disabled;
		}
	}
	updateKeyUpInput({ id, value }) {
		const input: HTMLInputElement = this.getInputById(id);
		input.value = value;
	}
	getInputById(id): HTMLInputElement {
		return document.querySelector(`[data-id="${id}"]`);
	}
}

export default View;
