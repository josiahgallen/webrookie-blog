'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
require('bootstrap');

var NavComponent = require('./components/NavComponent');
var RegisterFormComponent = require('./components/RegisterFormComponent');

Parse.initialize('RIE85nkokkObzapdlEG1LCBMy6nnLfvpbk22UP2m','F6B8q0pSDnwRRt3nZu4klF06LxxQVuM4jBX037fj');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'stayCurrent': 'current',
		'login': 'login',
		'register': 'register',
		'add': 'add',
		'category': 'category'
	},
	home: function() {
		ReactDOM.render(<h1>Home</h1>,document.getElementById('app'));
	},
	login: function() {
		ReactDOM.render(<RegisterFormComponent router={r}/>, document.getElementById('app'));
	},
	register: function() {
		ReactDOM.render(<RegisterFormComponent router={r}/>, document.getElementById('app'));
	},
	current: function() {
		ReactDOM.render(<h1>New Posts</h1>,document.getElementById('app'));
	},
	add: function() {
		ReactDOM.render(<h1>Add Post</h1>,document.getElementById('app'));
	},
	category: function() {
		ReactDOM.render(<h1>category</h1>,document.getElementById('app'));
	}
})

var r = new Router();
Backbone.history.start();

ReactDOM.render(
		<NavComponent router={r}/>,
		document.getElementById('nav')
	);