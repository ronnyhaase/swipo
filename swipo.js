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
	}

//
// Data API
//
$('[data-toggle="swipo-deck"]').each(function() {
	var $this = $(this)
		, $sdc = $this.find('[data-toggle="swipo-deck-center"]')

	Hammer(this).on('swipeleft', function() {
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
	})

	$this.on('mousedown', function(ev) {
		var $this = $(this)

		isDragging = true
		dragInfo.startX = ev.pageX
		dragInfo.startY = ev.pageY
		console.log( $this.parentsUntil('.swipo').parent().addClass('no-trans') )
	})

	$this.on('mouseup', function(ev) {
		var $this = $(this)

		isDragging = false
		dragInfo.startX = null
		dragInfo.startY = null
		console.log( $this.parentsUntil('.swipo').parent().removeClass('no-trans') )

		$sdc.css('left','')
	})

	$this.on('mousemove', function(ev) {
		var $this = $(this)

		if ( !isDragging )
			return

		if ( $sdc.length === 0 )
			return

		$sdc.css('left', ev.pageX + 'px')
	})
})

}(window.jQuery, window.Hammer);

