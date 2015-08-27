Meteor.methods({
	newThread: function( user1, user2 ) {
		Threads.insert({
			one: user1,
			two: user2
		});
	}
});