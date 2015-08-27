Template.sidebar.events({
	'click .username': function( e ) {
		e.preventDefault();

		Meteor.call( 'newThread', { user1: 'bozo', user2: 'bingo' }, function(err, res) {
			console.log( res );
		});
	}
});