Meteor.publish( 'users', function() {
	return Meteor.users.find( {}, { fields: {
		"username": true,
		"_id": true,
		"threadHistory": true,
		"avatar": true
	}});
});

Meteor.users.allow({ 
	update: function( userId, document, fieldNames, modifier ) {
		return true;
	}
});

Meteor.publish( 'threads', function() {
	return Threads.find( { users: this.userId } );
});

Meteor.publish( 'userPresence', function() {
  return UserPresences.find();
});