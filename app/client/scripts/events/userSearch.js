Template.userSearch.events({
    'keyup #user-search-field': function( e ) {
    	var value = e.currentTarget.value;

    	if( value == '' || value == ' ' ) {
    		value = undefined;
    	}

        Session.set( "search-query", value );
    }
});