Meteor.publish( 'threads', function() {
	return Threads.find( { userId: this.userId });
});

Meteor.publish( 'users', function() {
	return Meteor.users.find( {}, { fields: {
		"username": true,
		"_id": true,
		'currentThread': true
	}});
});

Meteor.publish( 'messages', function() {
	return Messages.find( { $or: [ { author: this.userId }, { recipient: this.userId } ] } );
});

Meteor.publish( 'userPresence', function() {
	// var filter = { state: online };

	// return UserPresences.find( filter );
	return UserPresences.find();
});