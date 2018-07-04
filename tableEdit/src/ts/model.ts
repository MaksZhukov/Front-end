import { EventEmitter, Store, DataModel } from './helpers';
class Model extends EventEmitter {
	public store: Store[];
	public count: number;
	public row: number;
	public col: number;
	constructor({ store, count, row, col }:DataModel) {
		super();
		this.store = store || [];
		this.count = count || 0;
		this.row = row || 0;
		this.col = col || 0;
	}
	createData(row: number, col: number): DataModel {
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
	getInput(id: number): Store {
		return this.store.filter(input => input.id == id)[0];
	}
	updateClickInput(id: number): Store {
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
	updateBlurInput(id: number): Store {
		const input: Store = this.getInput(id);
		input.disabled = !input.disabled;
		this.emit('change', {
			store: this.store,
			count: this.count,
			row: this.row,
			col: this.col
		});
		return input;
	}
	updateKeyUpInput({ id, value }: Store): Store {
		const input: Store = this.getInput(id);
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
