Template.thread.events({
	'click .remove--thread': function( e ) {
		e.preventDefault();

		var currThread = Threads.findOne( { recipientUserName: this.recipientUserName } )._id;

		Threads.update( currThread, {
			$set: { 'hidden': true }
		});
	}
});