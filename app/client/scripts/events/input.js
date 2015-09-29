var rawQueries		= [
		[ "friend", [ "matey", "hearty", "buckaneer", "seadog" ] ],
		[ "hello", [ "ahoy", "avast" ] ],
	],
	queries			= [];

rawQueries.forEach( function( ctx, idx ) {
	var	tempQ	= [
			ctx[0],
			ctx[1],
			new RegExp( ctx[0], 'i' )
		];
	queries.push( tempQ );
});

Template.footer.events( {
	'keyup #message-input': function( e ) {
		var inputVal	= document.getElementById( 'message-input' ).value,
			result		= inputVal;

		if( !!inputVal ) {
			var charCode = ( typeof e.which == "number" ) ? e.which : e.keyCode;

			if( charCode == 13 ) {
				e.stopPropagation();

				queries.forEach( function( ctx, idx ) {
					var	tempRegex	= new RegExp( ctx[0], 'g' ),
						occurences	= ( inputVal.match( tempRegex ) || [] ).length,
						randNum		= Math.floor(Math.random() * ( ctx[1].length - 0 ) ) + 0;

					for( i = 0; i < occurences; i++ ) {
						result = result.replace( ctx[2], "<span class='match' data-match='" + idx + "'>" + ctx[1][randNum] + "</span>" );
					}
				});

				// Push result to messages:
				var newMessage = {
					sender: Meteor.userId(),
					time: new Date(),
					message: result
				};

				Meteor.call( 'createMessage', Meteor.user().threadHistory[ Meteor.user().threadHistory.length - 1 ], newMessage );
				console.log( result );

				return false;
			}
		}
	}
});