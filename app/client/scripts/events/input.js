var textCount		= 0,
	rawQueries		= [
		[ "friend", [ "matey", "hearty", "buckaneer", "seadog" ] ],
		[ "hello", [ "ahoy", "avast" ] ],
	],
	before			= "<span class='match'>",
	after			= "</span>",
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

			/*if( charCode == 8 ) {
				textCount--;
			} else if( charCode == 13 ) {
				e.stopPropagation();
				textCount = 0;
				return false;
			} else {
				textCount++;
			}*/

			textCount = inputVal.length;

			pieces[matchNum] = inputVal.slice( matchIndex );

	    	queries.forEach( function( ctx, idx ) {
	    		var match = ctx[2].exec( pieces[matchNum] );
    			
    			if( match !== null ) {
		    		var randNum = Math.floor(Math.random() * ( ctx[1].length - 0 ) ) + 0,
		    			result = pieces[matchNum].replace( ctx[2], before + ctx[1][randNum] + after );

		    		pieces[matchNum] = result;
		    		matchNum++;
		    		matchIndex = inputVal.length;
    			}
	    	});

	    	// console.log( pieces );
	    	console.log( textCount );

	    	resultEl.innerHTML = pieces.join( '' );
		} else {
			textCount = 0;
		}
	}
});