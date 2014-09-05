/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var QuestionActions = require('../Actions/QuestionActions');
var QuestionStore = require('../Stores/QuestionStore');
var Users = require('./users/Users.react');
var Game = React.createClass({
	getInitialState : function(){
		return {
			activeQuestion : '',
			error : QuestionStore.errors,
			answer : '',
			finished : false,
			correct : QuestionStore.correct.length,
			wrong : QuestionStore.wrong.length,
			awardPoints : false
		};
	},
	getCurrentQuestion : function(){
		var qanda = QuestionStore.getActiveQuestion();
		if(!qanda){
			//No more questions
			this.setState({
				finished : true
			});
			return;
		}
		this.setState({
			activeQuestion : qanda.q,
			activeAnswer : qanda.a
		});
	},

	componentWillMount : function(){
		var that = this;
		QuestionStore.getQuestions().then(function(res){
			QuestionStore.active = 0;
			QuestionStore.activeQuestion = 0;
			QuestionStore.questions = res.questions;
			that.getCurrentQuestion();
		});
	},

	componentDidMount: function(){
		QuestionStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		QuestionStore.removeChangeListener(this._onChange);
	},

	_onChange : function(){
		this.getCurrentQuestion();
		this.setState({
			error : QuestionStore.errors,
			answer : '',
			correct : QuestionStore.correct.length,
			wrong : QuestionStore.wrong.length,
			awardPoints : QuestionStore.correctUser
		});
	},

	_submitAnswer : function(){
		var answer = this.state.answer;
		QuestionActions.submitAnswer({ q : QuestionStore.active, a : answer});
	},

	_handleAnswer : function(e){
		this.setState({
			answer : e.target.value
		});
	},
	render : function(){
		return (
			<section>
				<h1>Math Game</h1>
				{this.state.error ? <div className='alert alert-danger' role='alert'>Nope, that is not right</div> : ''}
				{this.state.finished ? <div className='alert alert-success' role='alert'>Great Job Everyone!  Quiz is over. {this.state.correct} correct, {this.state.wrong} mistake.</div> : ''}
				{this.state.awardPoints ? <div className='alert alert-success' role='alert'>{this.state.awardPoints} answered first, and receives <strong>100</strong> points!!</div> : ''}
				
				<Users />
				<div className='form-group'>
					<h2>{this.state.activeQuestion}</h2>
					<input className='form-control' onChange={this._handleAnswer} value={this.state.answer} type='number' placeholder='Answer' />
				</div>
				<div className='form-group'>
					<button className='btn btn-primary' onClick={this._submitAnswer}>Submit Answer</button>
				</div>
			</section>
		);
	}
});

module.exports = Game;
