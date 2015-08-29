Template.sidebar.events({
	'click .username': function( e ) {
		e.preventDefault();
		var user1Id = Meteor.userId(),
			user2Id = this._id,
			jointId	= user1Id.concat( '---', user2Id );

		// If there's already a thread, do nothing:
		if( Threads.find( { _id: jointId } ).count() ) {
			return;
		};

		var users = {
			_id: jointId
		};

		Meteor.call( 'newThread', users, function(err, res) {
			console.log( res );
		});
	}
});