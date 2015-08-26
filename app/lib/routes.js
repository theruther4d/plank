Router.route( '/', function () {
	if( !Meteor.userId() ) {
		this.render( 'marketing' );
	} else {
		this.render( 'main' );
	}
});