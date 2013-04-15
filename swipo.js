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
		var $sender = $(ev.target)

		if ( !($sender.is('[data-toggle="swipo-deck-center"]')) )
			return

		isDragging = true
		dragInfo.startX = ev.pageX
		dragInfo.startY = ev.pageY
		// If drag start X-pos is on the left half, drag the left panel, else the right one
		// Turn off transitions to avoid delay while dragging
		$sender.parentsUntil('.swipo').parent().addClass('no-transitions')
	})

	$this.on('mouseup', function(ev) {
		var $sender = $(ev.target)

		if ( !($sender.is('[data-toggle="swipo-deck-center"]')) )
			return
	
		isDragging = false
		dragInfo.dir = null
		$sender.parentsUntil('.swipo').parent().removeClass('no-transitions')

		$sdc.css({'left':'','right':''})
		$sdl.css({'width':''})
		$sdr.css({'width':''})
	})

	$this.on('mousemove', function(ev) {
		if ( !isDragging )
			return

		if ( $sdc.length === 0 )
			return

		if ( dragInfo.dir === 'left' ) {
			$sdl.css('width', (ev.pageX - dragInfo.startX) + 'px')
			$sdc.css('left', $sdl.width() + 'px')
		} else if ( dragInfo.dir === 'right' ) {
			$sdr.css('width', (dragInfo.startX - ev.pageX) + 'px')
			$sdc.css('right', $sdr.width() + 'px')
		} else {
			if (ev.pageX > dragInfo.startX)
				dragInfo.dir = 'left'
			else if (ev.pageX < dragInfo.startX)
				dragInfo.dir = 'right'
			// else still no dir
		}
	})
})

}(window.jQuery, window.Hammer);

