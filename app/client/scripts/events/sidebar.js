Template.sidebar.events({
	'click .open--users': function( e ) {
		e.preventDefault();

		var sidebar		= document.getElementsByClassName( 'sidebar' ).length ? document.getElementsByClassName( 'sidebar' )[0] : null,
			searchField	= document.getElementById( 'user-search-field' ),
			className	= 'users--visible',
			closePopup	= function( e ) {
				if( e.keyCode == 27 ) {
					sidebar.classList.remove( className );


					window.removeEventListener( 'keydown', closePopup, false);
				}
			};

			if( sidebar.classList.contains( className ) ) {
				sidebar.classList.remove( className );
				searchField.value = '';
				Session.set( "search-query", undefined );
			} else {
				sidebar.classList.add( className );
				window.addEventListener( 'keydown', closePopup, false);
			}
		
	}
});