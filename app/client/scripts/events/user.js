Template.user.events({
	'click .user-list__link': function( e ) {
		e.preventDefault();

		var	userId				= Meteor.userId(),
			recipientUsername	= this.username,
			recipientUserId		= Meteor.users.findOne( { username: recipientUsername } )._id,
			existingThread		= Threads.find( { users: { $in: [ userId, recipientUserId ] } } ).count();

		if( existingThread ) {
			console.log( "thread already exists" );
		} else {
			console.log( 'calling createThread' );
			Meteor.call( 'createThread', { userId: userId, recipientUserId: recipientUserId } );
		}


	}
})