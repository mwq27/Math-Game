'use strict';

var AppDispatcher = require('../Dispatcher/AppDispatcher');
var GameConstants = require('../Constants/GameConstants');

var QuestionActions = {
	submitAnswer : function(answerObj){
		AppDispatcher.handleViewAction({
			actionType : GameConstants.GAME_ANSWER,
			answerObj : answerObj
		});
	},
	
};

module.exports = QuestionActions;