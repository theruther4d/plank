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
			totalCurrThreads	= Meteor.user().threadHistory ? Meteor.user().threadHistory.length : 0;

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
		
		if( userStatus !== undefined ) {
			return 'state--' + userStatus.state;
		}
	}
});

Template.messageBox.helpers({
	messages: function() {
		if( !Meteor.user() ) {
			return;
		}

		var threadHistory		= Meteor.user().threadHistory;

		if( typeof threadHistory !== typeof undefined ) {
			var threadHistoryLength	= threadHistory.length,
				currentThread		= threadHistoryLength > 0 ? threadHistory[threadHistoryLength - 1] : threadHistory[0];

			return Threads.findOne( currentThread ).messages;
		}
	}
});

Template.message.helpers({	
	formatTime: function( timeString ) {
		var options = {
			hour: "2-digit",
			minute: "2-digit"
		};

		return timeString.toLocaleTimeString( navigator.language, options );
	},
	getAvatarByUserId: function( id ) {
		return Meteor.users.findOne( { _id: id } ).avatar;
	},
	getUsernameById: function( id ) {
		return Meteor.users.findOne( { _id: id } ).username;
	}
});

Template.header.helpers({
	threadRecipient: function() {
		if( !Meteor.user() ) {
			return;
		}

		var threadHistory		= Meteor.user().threadHistory;

		if( typeof threadHistory !== typeof undefined ) {
			var threadHistoryLength	= threadHistory.length,
				currentThread		= threadHistoryLength > 0 ? threadHistory[threadHistoryLength - 1] : threadHistory[0];

			function excludeCurrentUser ( val ) {
				return val !== Meteor.userId();
			}

			var otherUserID		= Threads.findOne( currentThread ).users.filter( excludeCurrentUser )[0],
				otherUserName	= Meteor.users.findOne( { _id: otherUserID } ).username;

			return otherUserName;
		}
	}
});