import { EventEmitter } from './helpers';

class View extends EventEmitter {
	constructor() {
		super();
		this.app = document.getElementById('app');
		this.button = document.createElement('button');
		this.button.innerText = 'Создать таблицу';
		this.button.addEventListener('click', this.handlerClickButton.bind(this));
		this.inputRow = document.createElement('input');
		this.inputRow.placeholder = 'Количество строк';
		this.inputCol = document.createElement('input');
		this.inputCol.placeholder = 'Количество столбцов';
		this.app.appendChild(this.button);
		this.app.appendChild(this.inputRow);
		this.app.appendChild(this.inputCol);
		this.table;
	}
	createTable(row, col, store) {
		this.inputRow.value = row;
		this.inputCol.value = col;
		const table = document.createElement('table');
		const tbody = document.createElement('tbody');
		let id = 0;
		table.appendChild(tbody);
		for (let i = 0; i < row; i++) {
			let tr = document.createElement('tr');
			for (let j = 0; j < col; j++) {
				let td = document.createElement('td');
				let input = document.createElement('input');
				input.dataset.id = store.find(input => input.id === id).id;
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
		this.table = table;
		this.app.appendChild(table);
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
		const input = this.getInputById(id);
		if (disabled === false) {
			input.classList.replace('disabled', 'enabled');
			input.readOnly = disabled;
		}
	}
	updateBlurInput({ id, disabled }) {
		const input = this.getInputById(id);
		if (disabled === true) {
			input.classList.replace('enabled', 'disabled');
			input.readOnly = disabled;
		}
	}
	updateKeyUpInput({ id, value }) {
		const input = this.getInputById(id);
		input.value = value;
	}
	getInputById(id) {
		return document.querySelector(`[data-id="${id}"]`);
	}
}

export default View;
