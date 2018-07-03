import Model from './js/model';
import View from './js/view';
import Controller from './js/controller';
import { load, save, Store } from './js/helpers';

const data = load();

const model = new Model(data || null);
model.on('change', data => save(data));
const view = new View();

const controller = new Controller(view, model);

import './sass/style.sass';
