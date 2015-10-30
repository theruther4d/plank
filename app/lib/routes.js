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
			var userId = Meteor.userId();

			if( userId ) {
				var userThreadHistory = Meteor.users.findOne( { _id: userId } ).threadHistory;

				if( userThreadHistory.length ) {
					var thread = Threads.findOne( { _id: userThreadHistory[userThreadHistory.length - 1 ] } );
					var otherUserId = thread.users[0] == userId ? thread.users[1] : thread.users[0];
					var otherUserName = Meteor.users.findOne( { _id: otherUserId } ).username;

					Router.go( '/messages/@' + otherUserName );
				}
			} else {
				Router.go( '/welcome' );
			}
		}
	}
});

Router.route( '/welcome', function() {
	this.render( 'welcome' );
}, {
	name: 'welcome'
});

Router.route( '/messages/@:_username', function() {
	this.render( 'messageBox' );
});