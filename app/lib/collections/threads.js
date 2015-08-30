Threads = new Mongo.Collection( 'threads' );

Meteor.users.allow({
	update: function( userId, doc, fields, modifier ) {
		return true;
	}
})