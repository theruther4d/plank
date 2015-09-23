Template.user.events({
	'click .user-list__link': function( e ) {
		e.preventDefault();

		var	userId				= Meteor.userId(),
			recipientUserId		= Meteor.users.findOne( { username: this.username } )._id,
			existingThread		= Threads.find( { users: { $all: [ userId, recipientUserId ] } } ).count();

		// Create the thread:
		if( !existingThread ) {
			console.log( 'calling createThread' );

			Meteor.call( 'createThread', { userId: userId, recipientUserId: recipientUserId }, function( err, result ) {
				if( !err ) {
					Meteor.call( 'updateThreadHistory', userId, result );
				} else {
					console.log( "error: ", err );
				}
			});
		}


	}
})