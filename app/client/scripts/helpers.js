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
		return Threads.find().count();
	},
	threads: function() {
		return Threads.find();
	}
});

Template.thread.helpers({
	getRecipientByUsers: function( users ) {
		var index		= users.indexOf( Meteor.userId() ) === 0 ? 1 : 0,
			recipientId	= users[index];

		return Meteor.users.findOne( { _id: recipientId } ).username;
	}
});