Meteor.methods({
	createThread: function( args ) {
		var userId			= args.userId,
			recipientUserId	= args.recipientUserId;

		Threads.insert({
			createdAt: new Date(),
			users: [ userId, recipientUserId ]
		}, function( err, _id ) {
			if( err ) {
				console.log( err );
			} else {
				console.log( 'success: ', _id );
			}
		});
	}
});