/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router/Link');
var UserList = React.createClass({
	getInitialState : function(){
		return {}
	},
	render : function(){
		var list = [];
		var users = this.props.users;
		for(var i = 0; i<users.length; i++){
			list.push(<li>{users[i]}</li>);
		}
		return (
			<ul>
				{list}
			</ul>
		)
	}
});

module.exports = UserList;