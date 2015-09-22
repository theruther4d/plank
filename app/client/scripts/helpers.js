Template.sidebar.helpers({
	usersCount: function() {
		return Meteor.users.find().count();
	},
	users: function() {
		console.log( Meteor.users.findOne( { username: "bingo" } ) );
		return Meteor.users.find( { _id: { $not: Meteor.userId() } } );
	}
})