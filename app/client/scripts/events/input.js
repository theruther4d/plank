Template.footer.events( {
	'keypress .message-input': function( e ) {
		var $input	= $( '.message-input' ),
			inputVal = $input.val();

		if( !!inputVal ) {
			var charCode = ( typeof e.which == "number" ) ? e.which : e.keyCode;
			if( charCode == 13 ) {
				e.stopPropagation();

				var recipient = Threads.findOne( { jointId: Meteor.user().currentThread, userId: Meteor.userId() } ).recipient,
					message = {
					date: Date.now(),
					author: Meteor.userId(),
					thread: Meteor.user().currentThread,
					recipient: recipient,
					text: $input.val()
				};

				Meteor.call( 'newMessage', message );

				$input.val( "" );
				return false;
			}
		}
	}
});