var React = require('react');
var Backbone = require('backbone');
var BlogPostModel = require('../models/BlogPostModel');
var BlogDetailsComponent = require('./BlogDetailsComponent');

module.exports = React.createClass({
	// getInitialState: function(){
	// 	return{
	// 		newPosts: []
	// 	}
	// },
	componentWillMount: function() {
		$('#myModal').on('shown.bs.modal', function () {
			$('#myInput').show()
		})
	},
	render: function() {
		return(
			<div className="jumbotron col-xs-offset-1 col-xs-10 col-sm-8 col-sm-offset-2">
				<span>{this.props.post.get('createdAt').toDateString()} </span>
				<h1>{this.props.post.get('title')}</h1>
				<p>{this.props.post.get('blogPost').substring(0,139)+'...'}</p>
				<p><a href={'#stayCurrent'} onClick={this.onModalLaunch} className="btn btn-default" dataToggle="modal" dataTarget="#myModal" role="button">Keep Reading</a></p>
				<span>{this.props.post.get('firstName')+' '+ this.props.post.get('lastName')}</span>
				<div id={this.props.post.id} className="modal fade bs-example-modal-lg" tabIndex="-1" role="dialog" ariaLabelledby="myLargeModalLabel">
					<div className="modal-dialog modal-lg">
						<div className="modal-content">
							<div className="jumbotron col-xs-offset-1 col-xs-10 col-sm-8 col-sm-offset-2">
								<BlogDetailsComponent post={this.props.post}/>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	},
	onModalLaunch: function() {
		$('#'+this.props.post.id).modal('show');
	}
})