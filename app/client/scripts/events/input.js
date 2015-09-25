var textCount		= 0,
	rawQueries		= [
		[ "friend", [ "matey", "hearty", "buckaneer", "seadog" ] ],
		[ "hello", [ "ahoy", "avast" ] ],
	],
	queries			= [];

rawQueries.forEach( function( ctx, idx ) {
	var	tempQ	= [
			ctx[0],
			ctx[1],
			new RegExp( ctx[0], 'g' )
		];
	queries.push( tempQ );
});

Template.footer.events( {
	'keyup #message-input': function( e ) {
		var resultEl		= document.getElementById( 'result' ),
			inputVal		= document.getElementById( 'message-input' ).value,
	    	allMatches		= [],
	    	formattedVal	= [],
	    	output;



		if( !!inputVal ) {
			var charCode = ( typeof e.which == "number" ) ? e.which : e.keyCode;

			if( charCode == 8 ) {
				textCount--;
			} else if( charCode == 13 ) {
				e.stopPropagation();
				textCount = 0;
				return false;
			} else {
				textCount++;
			}

			formattedVal[textCount] = inputVal;

	    	queries.forEach( function( ctx, idx ) {
	    		var randNum = Math.floor(Math.random() * ( ctx[1].length - 0 ) ) + 0;

	    		tempVal = formattedVal.join('').replace( ctx[2], "<span class='match'>" + ctx[1][randNum] + "</span>" );
	    		formattedVal = [ tempVal ];
	    	});

	    	resultEl.innerHTML = formattedVal;
		} else {
			textCount = 0;
		}
	}
});