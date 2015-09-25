getSearchResults = function() {
    var keyword	= Session.get( "search-query" ),
    	query	= new RegExp( keyword, 'i' );

    if( keyword == "" || keyword == " " ) {
    	return false;
    }

	return Meteor.users.find( { _id: { $ne: Meteor.userId() }, username: query } );
}

Template.userSearch.helpers({
	usersCount: function() {
		return Meteor.users.find().count();
	},
	users: function() {
		return Meteor.users.find( { _id: { $not: Meteor.userId() } } );
	},
	hasSearchResults: function() {
		return Session.get( 'search-query' ) !== undefined;
	},
	searchResultsCount: function() {
		return getSearchResults().count();
	},
	searchResults: function () {
	    return getSearchResults();
	}
});

Template.sidebar.helpers({
	threadCount: function() {
		return Threads.find( { hidden: { $ne: true } } ).count();
	},
	threads: function() {
		return Threads.find( { hidden: { $ne: true } } );
	},
	remainingThreads: function() {
		var totalNumThreads		= Threads.find().count(),
			totalCurrThreads	= Meteor.user().threadHistory.length;

		return totalNumThreads !== totalCurrThreads && totalCurrThreads > 0 ? totalNumThreads - totalCurrThreads : 0;
	}
});

Template.thread.helpers({
	getRecipientByUsers: function( users ) {
		var index		= users.indexOf( Meteor.userId() ) === 0 ? 1 : 0,
			recipientId	= users[index];

		return Meteor.users.findOne( { _id: recipientId } ).username;
	},
	selectedThread: function( threadId ) {
		var threadHistory 		= Meteor.user().threadHistory;

		if( threadHistory !== undefined ) {
			var threadHistoryLength	= threadHistory.length,
				currentThread		= threadHistory[threadHistoryLength - 1];

			return threadId == currentThread ? 'selected' : '';
		}
	},
	isOnline: function() {
		var index		= this.users.indexOf( Meteor.userId() ) === 0 ? 1 : 0,
			otherUserId	= this.users[index],
			userStatus	= UserPresences.findOne( { userId: otherUserId } );

		console.log( 'index: ', index );
		console.log( 'otherUserId: ', otherUserId );
		console.log( 'userStatus: ', userStatus );
		
		if( userStatus !== undefined ) {
			return 'state--' + userStatus.state;
		}
	}
});