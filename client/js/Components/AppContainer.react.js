/**
 * @jsx React.DOM
 */
var React = require('react');
var QuestionStore = require('../Stores/QuestionStore');
var QuestionActions = require('../Actions/QuestionActions');
var Link = require('react-router/Link');

var AppContainer = React.createClass({
	render : function(){

		return (
			<div className="container">
				<div className="row">
					<h3>Javascript Math Game</h3>
					<Link to='game' className='btn btn-success'>Start the game</Link>
					{this.props.activeRouteHandler()} 
				</div>
			</div>
		)
	}
});

module.exports = AppContainer;