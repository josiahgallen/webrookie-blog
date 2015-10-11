var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function() {
			this.props.router.on('route', () => {
			this.forceUpdate();
		});
	},
	componentDidMount: function(){
	    $(document).ready(function(){
	    	$('.dropdown-toggle').dropdown();
	    })
	},
	render: function() {
		var currentPage = Backbone.history.getFragment();
		var currentUser = Parse.User.current();

		var links = [
			<li key="stayCurrent" className={currentPage === 'stayCurrent' ? 'active' : ''}><a href="#stayCurrent">Stay Current<span className="sr-only">(current)</span></a></li>
		];
		var dropDownLinks = [];

		if(Parse.User.current()) {
			console.log('logged in');
			dropDownLinks.push(<li><a href="#add" key="add">Post</a></li>);
			dropDownLinks.push(<li><a href="#profile" key="profile">Profile</a></li>);
			dropDownLinks.push(<li key="separator" role="separator" className="divider"></li>);
			dropDownLinks.push(<li><a href="#stayCurrent" onClick={this.logout} key="logout">Logout</a></li>);
		} else {
			dropDownLinks.push(<li><a href="#login" key="login">Login</a></li>);
			dropDownLinks.push(<li><a href="#register" key="register">Register</a></li>);
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
			  <div className="container-fluid">
			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">Blog<span className="highlight">Rookie</span></a>
			    </div>
			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

			     
			      <ul className="nav navbar-nav navbar-right">
			        {links}
			        <li className="dropdown">
			          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{currentUser ? currentUser.get('firstName')+' '+ currentUser.get('lastName'): 'Contribute'} <span className="caret"></span></a>
			          <ul className="dropdown-menu">
			            {dropDownLinks}
			          </ul>
			        </li>
			      </ul>
			    </div>
			  </div>
			</nav>
		)
	},
	logout: function(e) {
		e.preventDefault();
		Parse.User.logOut();
		this.props.router.navigate('', {trigger: true});
		console.log('logout');
	}
})