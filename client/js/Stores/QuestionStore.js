var AppDispatcher = require('../Dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var GameConstants = require('../Constants/GameConstants');
var CHANGE_EVENT = 'change';
var config = require('../config/api-config');
var socket = require('socket.io-client')(config.url);
socket.on('event_already_answered', function(data){
	QuestionStore.correctUser = data.user;
	QuestionStore.emitChange();
});
//pull in a custom build of jQuery.
var $ = require('../libs/jquery.min');
function submitAnswer(ansObj) {
	var xhr = $.ajax({
		method: 'post',
		dataType : 'json',
		data : JSON.stringify(ansObj),
		url : config.url + '/game',
		contentType: "application/json"
	});
	socket.emit('newAnswer', {ans : 'something'});
}

var QuestionStore = merge(EventEmitter.prototype, {
	addChangeListener: function(callback){
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback);
	},
	emitChange : function(){
		this.emit(CHANGE_EVENT);
	},

	questions : [],
	active : 0,
	errors : false,
	correct : [],
	wrong : [],
	
	getQuestions: function(){
		var defer  = $.Deferred();
		var xhr = $.ajax({
			url : config.url + '/game',
			type : 'get',
		});
		xhr.done(function(res){
			this.questions = res;
			defer.resolve(res);
		});
		return defer;
	},

	getActiveQuestion : function(){
		return this.questions[this.active];
	},
	
	answerQuestion : function(answerObj){
		var q = answerObj.q,
			a = answerObj.a;
			if(this.questions[q].a === parseInt(a, 10)){
				this.active++;
				submitAnswer({q : q, a: a});
				if(this.correct.indexOf(q) === -1){
					this.correct.push(q);
				}
				this.errors = false;
			}else {
				if(this.wrong.indexOf(q) === -1){
					this.wrong.push(q);
				}
				this.errors = true;
			}
	}
});

AppDispatcher.register(function(payload){
	var action = payload.action;
	switch(action.actionType) {
		case GameConstants.GAME_ANSWER:
			QuestionStore.answerQuestion(action.answerObj);
			QuestionStore.emitChange();
			break;
		default:
			return true;
	}
	return true;
});
module.exports = QuestionStore;