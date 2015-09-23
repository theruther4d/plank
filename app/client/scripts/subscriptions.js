Meteor.subscribe( 'users' );
Meteor.subscribe( 'threads', function() {
	return Threads.find();
} );