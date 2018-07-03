import { EventEmitter } from './helpers';

class Model extends EventEmitter {
	constructor({ store, count, row, col }) {
		super();
		this.store = store || [];
		this.count = count || 0;
		this.row = row || 0;
		this.col = col || 0;
	}
	createData(row, col) {
		this.store = [];
		this.row = row;
		this.col = col;
		this.count = row * col;
		for (let i = 0; i < this.count; i++) {
			this.store.push({
				id: i,
				value: '',
				disabled: true
			});
		}
		this.emit('change', {
			store: this.store,
			count: this.count,
			row: this.row,
			col: this.col
		});
		return { row: this.row, col: this.col, store: this.store };
	}
	getInput(id) {
		return this.store.find(input => input.id == id);
	}
	updateClickInput(id) {
		const input = this.getInput(id);
		input.disabled = !input.disabled;
		this.emit('change', {
			store: this.store,
			count: this.count,
			row: this.row,
			col: this.col
		});
		return input;
	}
	updateBlurInput(id) {
		const input = this.getInput(id);
		input.disabled = !input.disabled;
		this.emit('change', {
			store: this.store,
			count: this.count,
			row: this.row,
			col: this.col
		});
		return input;
	}
	updateKeyUpInput({ id, value }) {
		const input = this.getInput(id);
		input.value = value;
		this.emit('change', {
			store: this.store,
			count: this.count,
			row: this.row,
			col: this.col
		});
		return input;
	}
}

export default Model;
