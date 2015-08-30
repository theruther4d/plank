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

Router.route( '/messages/:_userId', function(){
	this.render( 'messages', {
		waitOn: function() {
			Meteor.subscribe( 'messages' );
		},
		data: function() {
			return Messages.find( { _id: this.params._userId } );
		}
	});
}, { name: 'messages' } );