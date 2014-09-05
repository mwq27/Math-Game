'use strict';
//Tell jest not to mock any require(..) dependencies, since we need the real files.
jest.autoMockOff();

describe('UserStore Tests', function(){
	var UserStore;

	beforeEach(function(){
		var io = jest.genMockFunction();
		UserStore = require('../UsersStore.js');
	});

	it('Should return a list of players from the getAll function', function(){
		UserStore.players.push('someid');
		var list = UserStore.getAll();
		expect(typeof list).toBe('object');
	});
});