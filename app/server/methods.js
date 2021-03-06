Meteor.methods({
	/*
	** Creates a new thread:
	*/
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

	/*
	** Intelligently updates history of thread activity:
	*/
	updateThreadHistory: function( userId, threadId ) {
		var existingThreadHistory = Meteor.users.findOne( userId ).threadHistory;
		
		// If there isn't already a threadHistory
		// Initialize it with this thread:
		if( existingThreadHistory == undefined ) {
			Meteor.users.update( { _id: userId }, { $set: { threadHistory: [ threadId ] } } );
		}

		// If there is a thread history:
		else {
			var existingIndex	= existingThreadHistory.indexOf( threadId ),
				historyLength	= existingThreadHistory.length;

			// If this item is already in
			// the history array:
			if( existingIndex !== -1 ) {

				// If there's only one item in the history
				// array, or if this item is already the last
				// item in the history array, do nothing:
				if( historyLength === 1 || existingIndex === historyLength - 1 ) {
					return;
				}

				// Otherwise, remove this item from the existing
				// history array, and put it at the end:
				existingThreadHistory.splice( existingIndex, 1 );
				existingThreadHistory.push( threadId );

				// Push the updated history object:
				Meteor.users.update( { _id: userId }, { $set: { threadHistory: existingThreadHistory } } );

			}

			// Otherwise, if this item doesn't exist in the history array,
			// add it to the end:
			else {
				Meteor.users.update( { _id: userId }, { $push: { threadHistory: threadId } } );
			}
		}
	},

	/*
	** Removes the last thread from history:
	*/
	removeThreadFromHistory: function( userId ) {
		Meteor.users.update( { _id: userId }, { $pop: { threadHistory: 1 } } );
	},

	/*
	** Hides the thread from the sidebar:
	*/
	hideThread: function( threadId, userID ) {
		console.log( "threadId: ", threadId );
		console.log( "userID: ", userID );
		var threadHasHiddenArray = typeof Threads.find( { _id: threadId } ).hidden !== undefined;

		console.log( 'already has isHidden array: ', threadHasHiddenArray );

		// // If thread already has a hidden preference, push our userID to the end of the array:
		if( threadHasHiddenArray ) {
			Threads.update( threadId, { $push: { hidden: userID } } );
		}
		// Otherwise, $set the array for the first time:
		else {
			Threads.update( threadId, { $set: { hidden: userID } } );
		}
	},

	/*
	** Un-hides threads from the sidebar:
	*/
	showThread: function( threadId, userID ) {
		Threads.update( threadId, { $pull: { hidden: userID } } );
	},

	/*
	** Creates Message inside of thread:
	*/
	createMessage: function( threadId, messageObject ) {
		console.log( 'threadId: ', threadId );
		console.log( 'messageObject: ', messageObject );
		Threads.update( threadId, { $push: { messages: messageObject } } );
	}
});