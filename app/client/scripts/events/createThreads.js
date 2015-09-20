setCurrThread = function( username) {
	var formattedName	= '@' + username;

	if( Meteor.user().currentThread ) {
		var	newCurrList		= Meteor.user().currentThread,
			currUserIndex	= newCurrList.indexOf( formattedName );

		if( currUserIndex > -1 ) {
			newCurrList.splice( currUserIndex, 1 );
			newCurrList.push( formattedName );

			Meteor.users.update( Meteor.userId(), {
				$set: { 'currentThread': newCurrList }
			});
		} else {
			Meteor.users.update( Meteor.userId(), {
				$push: { 'currentThread': formattedName }
			});
		}
	} else {
		Meteor.users.update( Meteor.userId(), {
			$set: { 'currentThread': [ formattedName ] }
		});
	}
}

Template.sidebar.events({
	'click .username': function( e ) {

		var user1Id 	= Meteor.userId(),
			user1Name	= Meteor.user().username,
			user2Id 	= this._id,
			user2Name	= this.username,
			userIds		= [
				user1Id,
				user2Id
			];

		// Sort the array for consistent results:
		userIds.sort();
		var jointId		= userIds.join( '---' );

		// If there's already a thread, do nothing:
		if( Threads.find( { jointId: jointId } ).count() ) {
			setCurrThread( user2Name );
			return;
		}

		// Create the new threads:
		var newThreads = [
			{
				jointId: jointId,
				userId: user1Id,
				recipient: user2Id,
				recipientUserName: user2Name
			},
			{
				jointId: jointId,
				userId: user2Id,
				recipient: user1Id,
				recipientUserName: user1Name
			}
		];

		// Insert the threads:
		Meteor.call( 'newThread', newThreads, function(err, res) {
			setCurrThread( user2Name );
		});
	}
});