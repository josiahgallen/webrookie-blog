var React = require('react');
var Backbone = require('backbone');

var LoadingComponent = require('./LoadingComponent');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	          error: null,
	          loading: null
	    };
	},
	render: function() {
		var currentPage = Backbone.history.getFragment();
		var currentForm = null;
		var error = null;
		

		if (this.state.error) {
			error = (<div className="alert alert-danger" role="alert">{this.state.error}</div>);
		}

		var loginForm = (
			<div className="well well-lg col-xs-12 col-sm-8 col-sm-offset-2">
				<h1>Login</h1>
				{error}
				<form onSubmit={this.onLogin}>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1"><span className="glyphicon glyphicon-user" aria-hidden="true"></span></label>
						<input type="email" ref="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1"><span className="glyphicon glyphicon-barcode" aria-hidden="true"></span></label>
						<input type="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					</div>
					<button type="submit" className="btn btn-default"><strong>Submit</strong></button>
				</form>
			</div>);
		var registerForm = (
			<div className="well well-lg col-xs-12 col-sm-8 col-sm-offset-2">
				<h1>Register</h1>
				<p>
					Become a contributor on <span className="brLogo">Blog<span className="highlight">Rookie</span></span>! Sign up and share your voice. Whether you
					passionate about tech or the two-step this is place for you.  Start your own discussion
					or comment on another bloogers ideas.<br /><strong>Take the first step here...</strong>
				</p>
				{error}
				<br/>
				<form onSubmit={this.onRegister}>
					<div className="form-group col-xs-6">
						<label><span className="glyphicon glyphicon-user" aria-hidden="true"></span></label>
						<input type="text" ref="fName" className="form-control" placeholder="First Name" />
					</div>
					<div className="form-group col-xs-6">
						<label><span className="glyphicon glyphicon-user" aria-hidden="true"></span></label>
						<input type="text" ref="lName" className="form-control" placeholder="Last Name" />
					</div>
					<div className="form-group col-xs-12">
						<label htmlFor="exampleInputEmail1">@</label>
						<input type="email" ref="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
					</div>
					<div className="form-group col-xs-12">
						<label htmlFor="exampleInputPassword1"><span className="glyphicon glyphicon-barcode" aria-hidden="true"></span></label>
						<input type="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
					</div>
					<div className="form-group col-xs-12">
						<label><span className="glyphicon glyphicon-picture" aria-hidden="true"></span></label>
						<input type="text" ref="pic" className="form-control" placeholder="Profile Pic" />
					</div>
					<button type="submit" className="btn btn-default"><strong>Submit</strong></button>
				</form>
			</div>
		);
		if (currentPage === 'register') {
			currentForm = registerForm;
		} else if (currentPage === 'login') {
			currentForm = loginForm
		}
		// if (this.state.loading) {
		// 	currentForm = null;
		// }
		return (
			<div className="container-fluid">
				<div className="row">
					{currentForm}
					
				</div>
			</div>
		)
	},
	onRegister: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.signUp({
				username: this.refs.email.value,
				password: this.refs.password.value,
				email: this.refs.email.value,
				firstName: this.refs.fName.value,
				lastName: this.refs.lName.value,
				picture: this.refs.pic.value
			},
			{
				success: (u) => {
					this.props.router.navigate('profile', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}	
			}
		);
	},
	onLogin: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		Parse.User.logIn(
			this.refs.email.value,
			this.refs.password.value,
			{
				success: (u) => {
					this.props.router.navigate('stayCurrent', {trigger: true})
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});



