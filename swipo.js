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
	this.options = $.extend({}, $.fn.swipodeck.defaults, options)
	this.$element = $(element)
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
		, options = typeof option == 'object' && option

		if (!data) $this.data('swipodeck', (data = new SwipoDeck(this, options)))
		if (typeof option == 'string') data[option]()
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

/*** PLAYGROUND **/
var
	isDragging = false
	, dragInfo = {
		startX: null
		, startY: null
		, maxX: null
		, minX: null
		, dir: null
	}

//
// Data API
//
$('[data-toggle="swipo-deck"]').each(function() {
	var $this = $(this)
		, $sdc = $this.find('[data-toggle="swipo-deck-center"]')
		, $sdl = $this.find('[data-toggle="swipo-deck-left"]')
		, $sdr = $this.find('[data-toggle="swipo-deck-right"]')

	/*Hammer(this).on('swipeleft', function() {
		if ( $this.hasClass('left') )
			$this.removeClass('left')
		else if ( !$(this).hasClass('right') )
			$this.addClass('right')
	})
	.on('swiperight', function() {
		if ( $this.hasClass('right') )
			$this.removeClass('right')
		else if ( !$this.hasClass('left') )
			$this.addClass('left')
	})*/

	$this.on('mousedown', function(ev) {
		var $this = $(ev.target)

		if ( !($this.is('[data-toggle="swipo-deck-center"]')) )
			return

		isDragging = true
		dragInfo.startX = ev.pageX
		dragInfo.startY = ev.pageY
		// If drag start X-pos is on the left half, drag the left panel, else the right one
		dragInfo.dir = (ev.pageX <= $this.width() / 2 ) ? 'left' : 'right'
		// Calculate min & max positions
		dragInfo.minX = 0
		dragInfo.mouseMinX = (dragInfo.dir === 'left') ? dragInfo.minX + ev.pageX : dragInfo.minX - ev.pageX
		dragInfo.maxX = $this.width() * 0.2
		dragInfo.mouseMaxX = (dragInfo.dir === 'left') ? dragInfo.maxX + ev.pageX : dragInfo.maxX - ev.pageX
		// Turn off transitions to avoid delay while dragging
		$this.parentsUntil('.swipo').parent().addClass('no-transitions')
	})

	$this.on('mouseup', function(ev) {
		var $this = $(ev.target)

		if ( !($this.is('[data-toggle="swipo-deck-center"]')) )
			return
	
		isDragging = false
		$this.parentsUntil('.swipo').parent().removeClass('no-transitions')

		$sdc.css({'left':'','right':''})
		$sdl.css({'left':'','right':''})
		$sdr.css({'left':'','right':''})
	})

	$this.on('mousemove', function(ev) {
		var $this = $(this)
			, left = $sdc.css('left').slice(0,-2)
			, right = $sdc.css('right').slice(0,-2)
		
		if ( !isDragging )
			return

		if ( $sdc.length === 0 )
			return
		
		if ( dragInfo.dir === 'left' && ev.pageX >= dragInfo.mouseMinX && ev.pageX <= dragInfo.mouseMaxX /*(left >= dragInfo.minX) && left <= dragInfo.maxX*/ ) {
			$sdc.css('left', (ev.pageX - dragInfo.startX) + 'px')
		} else if ( dragInfo.dir === 'right' && ev.pageX >= dragInfo.mouseMinX  && ev.pageX <= dragInfo.mouseMaxX) {
			console.log(dragInfo.mouseMinX + ':' + dragInfo.mouseMaxX)
			$sdc.css('right', -(ev.pageX - dragInfo.startX) + 'px')
		}	
	})
})

}(window.jQuery, window.Hammer);

