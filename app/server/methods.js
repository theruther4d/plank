Meteor.methods({
	newThread: function( users ) {
		Threads.insert( users );
	}
});