Meteor.publish( 'threads', function() {
	return Threads.find();
});

Meteor.publish( 'users', function() {
	return Meteor.users.find( {}, { fields: {
		"username": true
	}});
});