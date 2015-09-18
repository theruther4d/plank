Router.configure({
	'layoutTemplate': 'main'
});

Router.onBeforeAction( function() {
	if( !Meteor.userId() ) {
		this.render( 'marketing' );
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
			var currUserId		= Meteor.userId(),
				currUserThread	= Meteor.users.findOne( { _id: currUserId } ).currentThread,
				otherUser		= Threads.findOne( { jointId: currUserThread, userId: currUserId } ).recipientUserName;

			Router.go( '/messages/@' + otherUser );
		}
	}
});

Router.route( '/messages/:_username', function(){
	this.render( 'messages', {
		waitOn: function() {
			Meteor.subscribe( 'messages' );
		}
	});
}, { name: 'messages' } );