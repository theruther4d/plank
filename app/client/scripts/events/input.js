Template.footer.events( {
	'keyup #message-input': function( e ) {
		var messageInput	= document.getElementById( 'message-input' ),
			messageScroll	= document.getElementsByClassName( 'message-area' )[0],
			inputVal		= messageInput.value;

		function insertMessage() {
			Meteor.call( 'createMessage', Meteor.user().threadHistory[ Meteor.user().threadHistory.length - 1 ], newMessage );

			setTimeout( function() {
				messageScroll.scrollTop = messageScroll.scrollHeight + 100;
			}, 100 );
		}

		if( !!inputVal ) {
			var charCode	= ( typeof e.which == "number" ) ? e.which : e.keyCode;

			if( charCode == 13 ) {
				e.stopPropagation();

				// Push result to messages:
				var newMessage = {
					sender: Meteor.userId(),
					time: new Date(),
					message: inputVal
				};

				// Get giphy:
				var req = new XMLHttpRequest();
				req.open( 'GET', 'http://api.giphy.com/v1/gifs/translate?s=pirate&api_key=dc6zaTOxFJmzC', true );

				req.onload = function() {
					if( req.status >= 200 && req.status < 400 ) {
						// Success!
						var res		= JSON.parse( req.responseText );
						giphy		= res.data.images.fixed_width.url;
						
						newMessage.giph = giphy;

						insertMessage();
					} else {
						// We reached our target server, but it returned an error
						console.log( 'error: ', res.status );

						insertMessage();
					}
				};

				req.onerror = function() {
					// There was a connection error of some sort
					console.log( 'connection error' );

					insertMessage();
				};

				req.send();

				messageInput.value = '';

				return false;
			}
		}
	}
});