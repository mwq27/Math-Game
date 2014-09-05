/**
 * @jsx React.DOM
 */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Routes = Router.Routes;

var Game = require('./Components/game.react');
var AppContainer = require('./Components/AppContainer.react');

var routes = (
	<Routes location="history">
		<Route handler={AppContainer}>
			<Route name="game" path="/game" handler={Game} />
		</Route>
	</Routes>
);

React.renderComponent(
	routes,
	document.body
);