import View from './view';
import Model from './model';
import {DataModel, Store} from './helpers';
class Controller {
	private view: View;
	private model: Model;
	constructor(view: View, model: Model) {
		this.view = view;
		this.model = model;
		view.on('clickButton', this.handlerClickButton.bind(this));
		view.on('click', this.handlerClickInput.bind(this));
		view.on('blur', this.handlerBlurInput.bind(this));
		view.on('keyup', this.handlerKeyUpInput.bind(this));
		if (model.store.length) {
			view.createTable(model.row, model.col, model.store);
		}
	}
	handlerClickButton({ row, col }:DataModel) {
		const data = this.model.createData(row, col);
		this.view.createTable(data.row, data.col, data.store);
	}
	handlerClickInput({ id }:Store) {
		const data = this.model.updateClickInput(id);
		this.view.updateClickInput(data);
	}
	handlerBlurInput({ id }:Store) {
		const data = this.model.updateBlurInput(id);
		this.view.updateBlurInput(data);
	}
	handlerKeyUpInput({ id, value }:Store) {
		const data = this.model.updateKeyUpInput({ id, value });
		this.view.updateKeyUpInput(data);
	}
}

export default Controller;
