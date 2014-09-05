'use strict';
//Tell jest not to mock any require(..) dependencies, since we need the real files.
jest
	.dontMock('../QuestionStore.js')
	.dontMock('../../config/api-config.js')
	.dontMock('tty')
	.dontMock('util')
	.dontMock('socket.io-client')
	.dontMock('../../libs/jquery.min');

describe('QuestionStore Tests', function(){
	var QuestionStore, $, problems;

	beforeEach(function(){
		var io = jest.genMockFunction();
		$ = require('../../libs/jquery.min');
		QuestionStore = require('../QuestionStore');
		problems = [
			{
				q : 'What is 1+1?',
				a : 2
			}
		];
		QuestionStore.questions = problems;
	});

	it('Should start with active quesiton set to 0', function(){
		expect(QuestionStore.active).toBe(0);
	});

	it('Should show the correct question', function(){
		var res = QuestionStore.getActiveQuestion();
		expect(res.q).toBe('What is 1+1?');
		expect(res.a).toBe(2);
	});

	describe('Answering a question', function(){
		it('Should set errors to true if a question is answered incorrectly', function(){
			var ansObjWrong  = {
				q: 0,
				a : 323
			};
			QuestionStore.answerQuestion(ansObjWrong);
			expect(QuestionStore.errors).toEqual(true);

			
		});

		it('Should increase the active quesiton count on a correct answer', function(){
			var ansObj  = {
				q: 0,
				a : 2
			};
			QuestionStore.answerQuestion(ansObj);
			expect(QuestionStore.active).toBe(1);
		});

		it('Should add the question id to the "wrong" array on incorrect responses ', function(){
			var ansObj  = {
				q: 0,
				a : 303
			};
			QuestionStore.answerQuestion(ansObj);
			expect(QuestionStore.wrong.indexOf(0) > -1).toBe(true);
		});

		it('Should add the question id to the "correct" array on correct responses ', function(){
			var ansObj  = {
				q: 0,
				a : 2
			};
			QuestionStore.answerQuestion(ansObj);
			expect(QuestionStore.correct.indexOf(0) > -1).toBe(true);
		});
	});
});