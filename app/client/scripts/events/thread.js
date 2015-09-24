Template.thread.events({
	'click .thread-list__link': function( e ) {
		e.preventDefault();

		Meteor.call( 'updateThreadHistory', Meteor.userId(), this._id );
	}
});