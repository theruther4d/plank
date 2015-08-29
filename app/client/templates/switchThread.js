Template.thread.events({
	'click .thread': function() {
		Meteor.users.update( Meteor.userId(), {
			$set: { 'currentThread': this.id }
		});
	}
})