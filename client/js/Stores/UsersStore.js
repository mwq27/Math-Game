var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var CHANGE_EVENT = 'change';
var config  = require('../config/api-config');
var socket = require('socket.io-client')(config.url);
socket.on('event_new_player', function(data){
	UserStore.players.push(data.id);
	UserStore.emitChange();
});
var UserStore = merge(EventEmitter.prototype, {
	addChangeListener: function(callback){
		console.debug('addChangeListener   -   event called', callback);
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange : function(){
		console.debug('emitChange   -   event called');
		this.emit(CHANGE_EVENT);
	},
	players : [],
	getAll: function(){
		return this.players;
	},
});
module.exports = UserStore;