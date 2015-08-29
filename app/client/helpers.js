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

Template.registerHelper( 'getOtherUser', function( threadId ) {
	var result	= threadId.split( '---' ),
		user1Id	= result[0],
		user2Id	= result[1],
		otherUser = Meteor.userId() == user1Id ? user2Id : user1Id;

	return Meteor.users.findOne( { _id: otherUser } ).username;
});