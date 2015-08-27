Template.sidebar.helpers( {
	threads: function() {
		return Threads.find();
	},
	users: function() {
		return Meteor.users.find();
	}
});