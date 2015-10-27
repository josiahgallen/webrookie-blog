'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;
require('bootstrap');

var NavComponent = require('./components/NavComponent');
var RegisterFormComponent = require('./components/RegisterFormComponent');
var AddBlogPostComponent = require('./components/AddBlogPostComponent');
var NewPostsPageComponent = require('./components/NewPostsPageComponent');
var BlogDetailsComponent = require('./components/BlogDetailsComponent');
var BloggerComponent = require('./components/BloggerComponent');
var ProfileComponent = require('./components/ProfileComponent');

Parse.initialize('RIE85nkokkObzapdlEG1LCBMy6nnLfvpbk22UP2m','F6B8q0pSDnwRRt3nZu4klF06LxxQVuM4jBX037fj');

var Router = Backbone.Router.extend({
	routes: {
		'': 'current',
		'stayCurrent': 'current',
		'login': 'login',
		'register': 'register',
		'add': 'add',
		'category': 'category',
		'profile': 'profile',
		'blogger/(:blogger)': 'blogger',
		'details/:id': 'details'
	},
	login: function() {
		ReactDOM.render(<RegisterFormComponent router={r}/>, document.getElementById('app'));
	},
	register: function() {
		ReactDOM.render(<RegisterFormComponent router={r}/>, document.getElementById('app'));
	},
	current: function() {
		ReactDOM.render(<NewPostsPageComponent router={r} />,document.getElementById('app'));
	},
	details: function(id) {
		console.log(id);
		ReactDOM.render(<BlogDetailsComponent id={id} />,document.getElementById('app'));
	},
	add: function() {
		ReactDOM.render(<AddBlogPostComponent router={r}/>,document.getElementById('app'));
	},
	blogger: function(blogger) {
		ReactDOM.render(<BloggerComponent blogger={blogger} />,document.getElementById('app'));
	},
	profile: function() {
		ReactDOM.render(<ProfileComponent />,document.getElementById('app'));
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