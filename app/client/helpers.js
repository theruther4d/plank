Template.sidebar.helpers( {
	threads: function() {
		return Threads.find();
	},
	threadCount: function() {
		return Threads.find().count();
	},
	usersCount: function() {
		return Meteor.users.find().count();
	},
	users: function() {
		return Meteor.users.find( { _id: { $not: Meteor.userId() } } );
	}
});