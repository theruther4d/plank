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

Template.messages.helpers( {
	messageCount: function() {
		return Messages.find().count();
	},
	messages: function() {
		return Messages.find( { thread: Meteor.user().currentThread });
	}
});

Template.registerHelper( 'getUsernameFromId', function( userId ) {
	return Meteor.users.findOne( { _id: userId } ).username;
});