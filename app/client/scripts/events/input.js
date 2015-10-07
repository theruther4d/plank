Template.footer.events( {
	'keyup #message-input': function( e ) {
		var messageInput	= document.getElementById( 'message-input' ),
			inputVal		= messageInput.value;

		// 	result		= inputVal;

		if( !!inputVal ) {
			var charCode = ( typeof e.which == "number" ) ? e.which : e.keyCode;

			if( charCode == 13 ) {
				e.stopPropagation();

				// Push result to messages:
				var newMessage = {
					sender: Meteor.userId(),
					time: new Date(),
					message: inputVal
				};

				Meteor.call( 'createMessage', Meteor.user().threadHistory[ Meteor.user().threadHistory.length - 1 ], newMessage );

				messageInput.value = '';

				return false;
			}
		}
	}
});