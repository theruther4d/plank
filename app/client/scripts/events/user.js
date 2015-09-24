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
					Meteor.call( 'updateThreadHistory', userId, result );
				}
			});
		}

		// Go to the thread:
		Router.go( '/messages/@' + this.username );

		// Close the user-search:
		document.getElementsByClassName( 'sidebar' )[0].classList.remove( 'users--visible' );
	}
})