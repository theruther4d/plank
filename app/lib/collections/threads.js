Threads = new Mongo.Collection( 'threads' );

Threads.allow({
	update: function( userId, doc, fields, modifier ) {
		return true;
	}
});