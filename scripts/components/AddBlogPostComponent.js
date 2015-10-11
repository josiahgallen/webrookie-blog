var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="well well-lg col-xs-12 col-sm-8 col-sm-offset-2">
				<h1>BlogRookie</h1>
				<br/>
				<form  onSubmit={this.onAdd} className="addForm">
					<div className="form-group col-xs-6">
						<label><span className="glyphicon glyphicon-book" aria-hidden="true"></span></label>
						<input type="text" ref="title" className="form-control" placeholder="Title" />
					</div>
					<div className="form-group col-xs-6">
						<label><span className="glyphicon glyphicon-question-sign" aria-hidden="true"></span></label>
						<input type="text" ref="category" className="form-control" placeholder="Category" />
					</div>
					<div className="form-group col-xs-12">
						<label htmlFor="exampleInputPassword1"><span className="glyphicon glyphicon-pencil" aria-hidden="true"></span></label>
						<textarea className="form-control" ref="blogPost" rows="6" placeholder="Blog Away..."></textarea>
					</div>
					<div className="form-group input-group-sm col-xs-3">
						<label><span className="glyphicon glyphicon-tag" aria-hidden="true"></span></label>
						<input type="text" ref="tags" className="form-control" placeholder="Tags" />
					</div>
					<button type="submit" className="btn btn-default"><strong><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></strong></button>
				</form>
			</div>
					
				</div>
			</div>

		)
	},
	onAdd: function(e) {
		e.preventDefault();
		var newPost = new BlogPostModel({
			user: Parse.User.current(),
			firstName: Parse.User.current().get('firstName'),
			lastName: Parse.User.current().get('lastName'),
			picture: Parse.User.current().get('picture'),
			title: this.refs.title.value,
			category: this.refs.category.value,
			blogPost: this.refs.blogPost.value,
			tags: [this.refs.tags.value]
		})
		newPost.save();
		this.refs.title.value = '';
		this.refs.category.value = '';
		this.refs.blogPost.value = '';
		this.refs.tags.value = '';
		this.props.router.navigate('stayCurrent', {trigger: true});
	}
})