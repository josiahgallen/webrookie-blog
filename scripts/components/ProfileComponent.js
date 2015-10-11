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
		var myPosts = this.state.newPosts.map((post) => {
			return(
				<div className="jumbotron col-xs-offset-1 col-xs-10 col-sm-8 col-sm-offset-2">
					<span>{post.get('createdAt').toDateString()} </span>
  					<h1>{post.get('title')}</h1>
  					<p>{post.get('blogPost')}</p>
  					
  					<span>{post.get('firstName')+' '+ post.get('lastName')}</span>
				</div>
			)
		})
		return(
			<div>
			<div className='jumboWrapper'>
			<div className="panel panel-default col-xs-offset-1 col-xs-10">
  				<div className="panel-heading"><h3>{Parse.User.current().get('firstName')} {Parse.User.current().get('lastName')+ '\'s Profile'}</h3><img src={Parse.User.current().get('picture')}/></div>
  				<div className="panel-body">
  			</div>
			  <ul className="list-group">
			    <li className="list-group-item">{Parse.User.current().get('username')}</li>
			    <li className="list-group-item">{'Blogging since ' + Parse.User.current().get('createdAt').toDateString()}</li>
			    
			  </ul>
			</div>
				{myPosts}
				
			</div>
			</div>
		)
	}
})