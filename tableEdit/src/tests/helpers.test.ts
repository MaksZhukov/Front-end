import * as mocha from 'mocha';
import * as chai from 'chai';

import {EventEmitter} from '../ts/helpers';

const expect = chai.expect;
describe('My Helpers library', () => {

  it('should be able to return correctly' , () => {
		const event = new EventEmitter();
		event.emit('click',{test:'test'});
    expect(event.events.click).to.equal(undefined);
  });

});