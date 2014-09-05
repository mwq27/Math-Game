/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var UserStore = require('../../Stores/UsersStore');
var UserList = require('./UserList.react');
var Users = React.createClass({
	getInitialState : function(){
		return {
			userList : []
		};
	},
	_getUsersState : function(){
		var that = this,
			list = [];
			var players = UserStore.getAll();
			this.setState({
				userList : players
			});
	},


	componentWillMount : function(){
		this._getUsersState();
	},

	componentDidMount: function(){
		UserStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
		UserStore.removeChangeListener(this._onChange);
	},

	_onChange : function(){
		this._getUsersState();
	},
	render : function(){
		return (
			<section>
				<h3>Connected users</h3>
				<UserList users={this.state.userList}/>
			</section>
		);
	}
});

module.exports = Users;
