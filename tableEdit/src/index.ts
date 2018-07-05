import Model from './ts/model';
import View from './ts/view';
import Controller from './ts/controller';
import { load, save, DataModel } from './ts/helpers';

const data = load();

const model = new Model(data || {});
model.on('change', (data:DataModel) => save(data));
const view = new View();

const controller = new Controller(view, model);

import './sass/style.sass';
