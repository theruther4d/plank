Router.configure({
	'layoutTemplate': 'main'
});

Router.onBeforeAction( function() {
	if( !Meteor.userId() ) {
		this.render( 'accounts' );
	} else {
		this.next();
	}
});

Router.route( '/', {
	subscriptions: function() {
		return Meteor.subscribe( 'users' );
	},
	action: function() {
		if( this.ready() ) {
			Router.go( '/welcome' );
		}
	}
});

Router.route( '/welcome', function() {
	this.render( 'welcome' );
}, {
	name: 'welcome'
});