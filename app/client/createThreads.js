Template.sidebar.events({
	'click .username': function( e ) {
		e.preventDefault();
		var user1Id 	= Meteor.userId(),
			user1Name	= Meteor.user().username,
			user2Id 	= this._id,
			user2Name	= this.username,
			jointId		= user1Id.concat( '---', user2Id );

		// If there's already a thread, do nothing:
		if( Threads.find( { jointId: jointId } ).count() ) {
			return;
		};

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

		Meteor.call( 'newThread', newThreads, function(err, res) {
			console.log( res );
		});
	}
});