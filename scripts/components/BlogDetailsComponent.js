var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			id: this.props.id,
			currentPost: []
		}
	},
	componentWillMount: function() {
		var query = new Parse.Query(BlogPostModel);
		query.equalTo('objectId', this.state.id).find().then(
			(post) => {
				this.setState({currentPost: post})
			},
			(err) => {
				console.log(err);
			}
		)
	},
	render: function() {
		console.log(this.state.id);
		console.log(this.state.currentPost);
		var currentPost = this.state.currentPost.map((post) => {
			return(
				<div className="jumboWrapper blogDetailView">
				<div className="jumbotron col-xs-offset-1 col-xs-10 col-sm-8 col-sm-offset-2">
					<a className="profLink" href={'#blogger/'+post.get('user')} ><img src={post.get('picture')} className="blogPic" /><span> {post.get('firstName')+' '+ post.get('lastName')} </span></a><span className="rightSide">{post.get('category')} </span>
  					<h1>{post.get('title')}</h1>
  					<p>{post.get('blogPost')}</p>
  					<span className="rightSide">{post.get('createdAt').toDateString()} </span>
  					<span className="label label-info">{post.get('tags')}</span>
				</div>
				</div>
			)
		})
		return(
			<h1>{currentPost}</h1>
		)
	}
})