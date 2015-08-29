Router.configure({
	'layoutTemplate': 'main'
});

Router.route( '/', function () {
	if( !Meteor.userId() ) {
		this.render( 'marketing' );
	} else {
		this.render( 'messages' );
	}
});

Router.route( '/messages/:_message', function(){
	this.render( 'messages' );
}, { name: 'messages' } );