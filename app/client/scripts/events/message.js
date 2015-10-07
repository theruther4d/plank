Template.bozo.events({
	'click li': function( e ) {
		e.preventDefault();

		console.log( this );
	}
})