var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');
var NewPostsComponent = require('./NewPostsComponent');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			newPosts: []
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(BlogPostModel);
		query.descending('createdAt').limit(20).find().then(
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
			return(<NewPostsComponent post={post} key={post.id}/>);
		})
		return (
			<div className='jumboWrapper'>
				<div className="jumbotron heroImage col-xs-12">
				<h1>Blog<span className="highlight">Rookie</span></h1>
				</div>
				<div>{newestPosts}</div>
			</div>
			)
	}
	
});