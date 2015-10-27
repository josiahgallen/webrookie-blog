var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			newPosts: []
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(BlogPostModel);
		query.equalTo('user', Parse.User.current()).find().then(
				(post) => {
					this.setState({newPosts: post});
				},
				(err) => {
					console.log(err);
				}
			)
	},
	render: function() {
		var newestPosts = this.state.newPosts.map((post) => {
			return(
				<div className="jumbotron col-xs-offset-1 col-xs-10 col-sm-8 col-sm-offset-2">
					<span>{post.get('createdAt').toDateString()} </span>
					<h1>{post.get('title')}</h1>
					<p>{post.get('blogPost').substring(0,139)+'...'}</p>
					<p><a href={'#details/'+post.id} className="btn btn-default" dataToggle="modal" dataTarget="#myModal" role="button">Keep Reading</a></p>
					<span>{post.get('firstName')+' '+ post.get('lastName')}</span>
				</div>
			)
		})
		return(
			<div className='jumboWrapper'>
				{newestPosts}
			</div>
		)
	}
})