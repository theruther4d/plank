Meteor.methods({
	newThread: function( newThreads ) {
		Threads.insert( newThreads[0] );
		Threads.insert( newThreads[1] );
	}
});