Meteor.methods({
	newThread: function( newThreads ) {
		Threads.insert( newThreads[0] );
		Threads.insert( newThreads[1] );
	},
	newMessage: function( message ) {
		Messages.insert( message );
	}
});