Template.sidebar.events({
	'click .username': function( e ) {
		e.preventDefault();

		var users = {
			between: {
				user1: Meteor.userId(),
				user2: this._id
			}
		};

		Meteor.call( 'newThread', users, function(err, res) {
			console.log( res );
		});
	}
});