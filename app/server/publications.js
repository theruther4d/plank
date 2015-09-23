Meteor.publish( 'users', function() {
	return Meteor.users.find( {}, { fields: {
		"username": true,
		"_id": true,
		"currentThread": true,
		"avatar": true
	}});
});

Meteor.users.allow({ 
	update: function( userId, document, fieldNames, modifier ) {
		return true;
	}
});

Meteor.publish( 'threads', function() {
	return Meteor.threads.find( { users: Meteor.userId() } );
});