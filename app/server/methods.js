Meteor.methods({
	createThread: function( args ) {
		var userId			= args.userId,
			recipientUserId	= args.recipientUserId,
			newThread		= Threads.insert({
				createdAt: new Date(),
				users: [ userId, recipientUserId ]
			}, function( err, id ) {
				console.log( 'error: ', err );
				console.log( 'id: ', id );
			});

		return newThread;
	},
	updateThreadHistory: function( userId, threadId ) {
		if( Meteor.users.findOne( userId ).threadHistory ) {
			console.log( "threadHistory exists: ", Meteor.users.findOne( userId ) );
		} else {
			console.log( "adding threadHistory" );
			Meteor.users.update( { _id: userId }, { $set: { threadHistory: [ threadId ] } } );
		}
	}
});