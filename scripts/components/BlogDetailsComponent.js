var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');

module.exports = React.createClass({
	getInitialState: function() {
		return{
			id: this.props.id,
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
		return(
			<div>
				<a className="profLink" href={'#blogger/'+this.props.post.get('user')} ><img src={this.props.post.get('picture')} className="blogPic" /><span> {this.props.post.get('firstName')+' '+ this.props.post.get('lastName')} </span></a><span className="rightSide">{this.props.post.get('category')} </span>
				<h1>{this.props.post.get('title')}</h1>
				<p>{this.props.post.get('blogPost')}</p>
				<span className="rightSide">{this.props.post.get('createdAt').toDateString()} </span>
				<span className="label label-info">{this.props.post.get('tags')}</span>
			</div>
		)
	}
})