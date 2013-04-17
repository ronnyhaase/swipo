!function ($, Hammer) {

if ( !($) || !('on' in $()) ) {
	console.log('ERROR: Swipo requires jQuery >= v1.7')
	return
}

/*if ( !(Hammer) ) {
	console.log('ERROR: Swipo requires Hammer.js >= v1.0')
	return
}*/

"use strict"; // jshint ;_;

/* SwipoDeck Class Definition
 * ========================== */
var SwipoDeck = function(element, options) {
	var $el = $(element)
		, $dl = $el.find('> [data-toggle="swipo-deck-left"]')
		, $dr = $el.find('> [data-toggle="swipo-deck-right"]')
		, $dc = $el.find('> [data-toggle="swipo-deck-center"]')

		, dragInfo = {
			startX: null // pointer x-pos
			, startY: null // pointer y-pos
			, dir: null // drag direction
		}

	this.options = $.extend({}, $.fn.swipodeck.defaults, options)
	this.$element = $el
	this.$deckLeft = $dl
	this.$deckRight = $dr
	this.$deckCenter = $dc

	function _onPointerDown(ev) {
		// Add event listener for pointer move (so we don't listen to this all the time)
		$el.on('mousemove.swipo.swipodeck', _onPointerMove)

		dragInfo.startX = ev.pageX
		dragInfo.startY = ev.pageY
		dragInfo.startWidthLeft = $dl.width()
		dragInfo.startWidthRight = $dr.width()

		// Turn off transitions
		$el.addClass('no-transitions')
	}

	function _onPointerUp(ev) {
		/*var dltw = calcToggleWidth()
			, drtw = calcToggleWidth()

		if ( dragInfo.dir === 'left' )
		else if ( dragInfo.dir === 'right' )*/

		// Remove pointer move listener
		$el.off('mousemove.swipodeck')
		// Reset dragInfo
		dragInfo.dir = null
		// Turn on transitions
		$el.removeClass('no-transitions')

		// Remove CSS changes
		$dc.css({'left':'','right':''})
		$dl.css({'width':''})
		$dr.css({'width':''})
	}

	function _onPointerMove(ev) {
		if ( dragInfo.dir === 'left' ) {
			$dl.css('width', (ev.pageX - dragInfo.startX + dragInfo.startWidthLeft ) + 'px')
			$dc.css('left', $dl.width()  + 'px')
		} else if ( dragInfo.dir === 'right' ) {
			$dr.css('width', (dragInfo.startX - ev.pageX + dragInfo.startWidthRight ) + 'px')
			$dc.css('right', $dr.width() + 'px')
		} else /* no dragInfo.dir */ {
			if (ev.pageX > dragInfo.startX)
				dragInfo.dir = (/*$el.hasClass('left-in')*/true ) ? 'left' : 'right'
			else if (ev.pageX < dragInfo.startX)
				dragInfo.dir = (/*! $el.hasClass('right-in')*/true ) ? 'right' : 'left'
			// else still no dir
		}
	}

	$dc.on('mousedown.swipo.swipodeck', _onPointerDown)
	$dc.on('mouseup.swipo.swipodeck', _onPointerUp)
}

SwipoDeck.prototype.showDeck = function(){}
SwipoDeck.prototype.hideDeck = function(){}
SwipoDeck.prototype.toggleDeck = function(){}
SwipoDeck.prototype.destroy = function(){}

/* SwipoDeck Plugin Definition
 * =========================== */

var old = $.fn.swipodeck

$.fn.swipodeck = function(option) {
	return this.each(function () {
		var $this = $(this)
		, data = $this.data('swipodeck')
		, options = typeof option === 'object' && option

		if (!data) $this.data('swipodeck', (data = new SwipoDeck(this, options)))
		if (typeof option === 'string') data[option]()
	})
}

$.fn.swipodeck.Constructor = SwipoDeck

$.fn.swipodeck.defaults = {
	emulateTouch: true
}

/* SwipoDeck No Conflict
 * ===================== */

 $.fn.swipodeck.noConflict = function () {
 	$.fn.swipodeck = old
	return this
 }

/* SwipoDeck Data-API
 * ================== */

// TODO: Non correct implementation of Data API!
$('[data-toggle="swipo-deck"]').swipodeck()

}(window.jQuery, window.Hammer);

