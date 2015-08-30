Threads = new Mongo.Collection( 'threads' );

Meteor.users.allow({
	update: function( userId, doc, fields, modifier ) {
		console.log( '------------' );
		console.log( 'user updated userId: ', userId );
		console.log( 'user updated doc: ', doc );
		console.log( 'user updated fields: ', fields );
		console.log( 'user updated modifier: ', modifier );
		// User is logged in, field is currentThread
		return true;
		// return ( userId && fields.length === 0 && fields[0] == 'currentThread' );
	}
})