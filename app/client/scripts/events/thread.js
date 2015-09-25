Template.thread.events({
	'click .thread-list__link': function() {
		console.log( this );
		Meteor.call( 'updateThreadHistory', Meteor.userId(), this._id );
	},
	'click .thread-list__close': function( e ) {
		e.preventDefault();

		// If this was the last thread, go to the welcome route:
		var threadHistory		= Meteor.user().threadHistory,
			threadHistoryLength	= threadHistory.length,
			lastThread			= threadHistory[threadHistoryLength - 1];

		if( threadHistoryLength == 1 && lastThread == this._id ) {
			Router.go( 'welcome' );
		}

		// Hide the thread:
		Meteor.call( 'hideThread', this._id );

		// Remove it from the user's history:
		Meteor.call( 'removeThreadFromHistory', Meteor.userId() );
	}
});