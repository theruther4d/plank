Template.user.events({
	'click .user-list__link': function( e ) {
		e.preventDefault();

		var	userId				= Meteor.userId(),
			recipientUserId		= Meteor.users.findOne( { username: this.username } )._id,
			thread				= Threads.findOne( { users: { $all: [ userId, recipientUserId ] } } );

		// If this thread does NOT already
		// exist, create it:
		if( thread == undefined ) {
			Meteor.call( 'createThread', { userId: userId, recipientUserId: recipientUserId }, function( err, result ) {
				if( !err ) {
					Meteor.call( 'updateThreadHistory', userId, result, function( err, result ) {
						if( !err ) {
							// Make sure this thread is visible:
							Meteor.call( 'showThread', result );
						}
					});
				}
			});
		} else {
			// Update the history:
			Meteor.call( 'updateThreadHistory', userId, thread._id );
			
			// Make sure this thread is visible:
			Meteor.call( 'showThread', thread._id );
		}

		// Go to the thread:
		Router.go( '/messages/@' + this.username );

		// Close the user-search:
		document.getElementsByClassName( 'sidebar' )[0].classList.remove( 'users--visible' );
	}
})