Threads = new Mongo.Collection( 'threads' );

Meteor.users.allow({
	update: function( userId, doc, fields, modifier ) {
		// User is logged in, field is currentThread
		return true;
		// return ( userId && fields.length === 0 && fields[0] == 'currentThread' );
	}
})