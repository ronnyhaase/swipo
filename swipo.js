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
		dragInfo.mouseMinX = dragInfo.minX + ev.pageX
		dragInfo.maxX = $this.width() * 0.2
		dragInfo.mouseMaxX = dragInfo.maxX + ev.pageX
		// Turn of transitions to avoid delay while dragging
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
		} else if (dragInfo.dir === 'right')
			$sdc.css('right', -(ev.pageX - dragInfo.startX) + 'px')
			
	})
})

}(window.jQuery, window.Hammer);

