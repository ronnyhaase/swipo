!function ($, Hammer) {

if ( !($) || !('on' in $()) ) {
	console.log('ERROR: Swipo requires jQuery >= v1.7')
	return
}

if ( !(Hammer) ) {
	console.log('ERROR: Swipo requires Hammer.js >= v1.0')
	return
}

"use strict";

//
// Data API
//
/*$('[data-toggle="swipo-deck-right"]').each(function() {
	Hammer(this).on('swiperight', function() {
		$(this).parent().removeClass('right');
	})
})

$('[data-toggle="swipo-deck-left"]').each(function() {
	Hammer(this).on('swipeleft', function() {
		$(this).parent().removeClass('left');
	})
})*/

$('[data-toggle="swipo-deck"]').each(function() {
	Hammer(this).on('swipeleft', function() {
		if ( $(this).hasClass('left') )
			$(this).removeClass('left')
		else if ( !$(this).hasClass('right') )
			$(this).addClass('right')
	})
	.on('swiperight', function() {
		if ( $(this).hasClass('right') )
			$(this).removeClass('right')
		else if ( !$(this).hasClass('left') )
			$(this).addClass('left')
	})
})

}(window.jQuery, window.Hammer);

