Meteor.publish( 'threads', function() {
	return Threads.find( { userId: this.userId });
});

Meteor.publish( 'users', function() {
	return Meteor.users.find( {}, { fields: {
		"username": true,
		"_id": true
	}});
});