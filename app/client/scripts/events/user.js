Template.user.events({
	'click .user-list__link': function( e ) {
		e.preventDefault();

		var	userId				= Meteor.userId(),
			recipientUserId		= Meteor.users.findOne( { username: this.username } )._id,
			thread				= Threads.find( { users: { $all: [ userId, recipientUserId ] } } ).count();
			hasThreadHistory	= thread ? typeof Threads.find( { users: { $all: [ userId, recipientUserId ] } } ).threadHistory !== undefined : 0;


		// Create the thread:
		if( !existingThread ) {
			
		// 	Meteor.call( 'createThread', { userId: userId, recipientUserId: recipientUserId }, function( err, result ) {
		// 		if( !err ) {
		// 			Meteor.call( 'updateThreadHistory', userId, result );
		// 		} else {
		// 			console.log( "error: ", err );
		// 		}
		// 	});
		} else {
		// 	Meteor.call( 'updateThreadHistory', userId,  );
		}


	}
})