Template.thread.events({
	'click .thread-list__link': function() {
		Meteor.call( 'updateThreadHistory', Meteor.userId(), this._id );
	},
	'click .thread-list__close': function( e ) {
		e.preventDefault();

		// Hide the thread:
		Meteor.call( 'hideThread', this._id );

		// Remove it from the users history:
		Meteor.call( 'removeThreadFromHistory', Meteor.userId() );
	}
});