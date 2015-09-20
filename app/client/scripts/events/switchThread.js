Template.thread.events({
	'click .thread': function() {
		setCurrThread( this.recipientUserName );
	}
})