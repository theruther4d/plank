Template.sidebar.helpers( {
	threads: function() {
		return Threads.find();
	},
	threadCount: function() {
		return Threads.find().count();
	},
	usersCount: function() {
		return Meteor.users.find().count();
	},
	users: function() {
		return Meteor.users.find( { _id: { $not: Meteor.userId() } } );
	}
});

Template.thread.helpers({
	isSelectedThread: function( username ) {		

		if( Meteor.userId() ) {
			var currentThread = Meteor.user().currentThread;
			if( currentThread && ( "@" + currentThread ) == username ) {
				return "selected";
			}

			return "";
			
		} else {
			return '';
		}
	},
	isOnline: function( threadId ) {

		var otherUserId = Threads.findOne( { _id: threadId } ).recipient,
			userStatus	= UserPresences.findOne( { userId: otherUserId } );

		if( userStatus !== undefined ) {
			return 'state--' + userStatus.state;
		}
	}
});

Template.messages.helpers({
	messageCount: function() {
		return Messages.find().count();
	},
	messages: function() {
		return Messages.find( { thread: Meteor.user().currentThread });
	}
});

Template.header.helpers({
	threadRecipient: function() {
		return Threads.findOne( { jointId: Meteor.user().currentThread } ).recipientUserName;
	}
})

Template.registerHelper( 'getUsernameFromId', function( userId ) {
	return Meteor.users.findOne( { _id: userId } ).username;
});

Template.login.helpers({
	hasError: function() {
		return Session.get( 'loginError' ) !== null;
	},
	errorMessage: function() {
		return Session.get( 'loginError' );
	}
});

Template.register.helpers({
	hasError: function() {
		return Session.get( 'registerError' ) !== null;
	},
	errorMessage: function() {
		return Session.get( 'registerError' );
	}
});