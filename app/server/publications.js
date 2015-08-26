Meteor.publish( 'threads', function() {
	return Threads.find();
});

Meteor.publish( 'userList', function() {
	return Meteor.users.find( {
		fields: 'username'
	});
});