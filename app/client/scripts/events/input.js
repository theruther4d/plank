var textCount		= 0,
	rawQueries		= [
		[ "friend", [ "matey", "hearty", "buckaneer", "seadog" ] ],
		[ "hello", [ "ahoy", "avast" ] ],
	],
	before			= "<span class='match'>",
	after			= "</span>",
	bLength			= before.length,
	aLength			= after.length,
	queries			= [],
	pieces			= [],
	matchIndex		= 0,
	matchNum		= 0;

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
			inputVal		= document.getElementById( 'message-input' ).value;

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

			pieces[matchNum] = inputVal.slice( matchIndex );

			// console.log( "matchIndex: ", matchIndex );
			// console.log( "portion: ", inputVal.slice( matchIndex ) );

			// formattedVal[textCount] = inputVal;

	    	queries.forEach( function( ctx, idx ) {
	    		var match = ctx[2].exec( pieces[matchNum] );
    			
    			if( match !== null ) {
    				console.log( match );
		    		var randNum = Math.floor(Math.random() * ( ctx[1].length - 0 ) ) + 0,
		    			result = pieces[matchNum].replace( ctx[2], before + ctx[1][randNum] + after );

		    		pieces[matchNum] = result;
		    		matchIndex = match.index + match[0].length;
		    		matchNum++;
    			}

	    		// if( ctx[2].test( inputVal ) ) {
	    			// console.log( ctx[2] );
	    			// console.log( inputVal );
    	// 		if( match !== null ) {
    	// 			var pLength		= pieces.length,
    	// 				joint		= pLength ? pieces[pLength - 1].join( '' ),
    	// 				beforeMatch = inputVal.slice( 0, match.index );

					// console.log( joint );

    	// 			pieces.push( beforeMatch );

    	// 			console.log( beforeMatch );
    	// 		}
	    		// }

	    		// tempVal = formattedVal.join('').replace( ctx[2], "<span class='match'>" + ctx[1][randNum] + "</span>" );
	    		// formattedVal = [ tempVal ];
	    	});

	    	console.log( pieces );

	    	// resultEl.innerHTML = formattedVal;
	    	resultEl.innerHTML = pieces.join[''];
		} else {
			textCount = 0;
		}
	}
});