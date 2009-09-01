/**
 * use the users browser to localise the 'last updated' field from UTC
 */
function localiseTimestamp(){
	var d = new Date($('#trends span').attr('title'));
	var pd = d.getHours() + ':' + d.getMinutes();
	$('#trends span').html(pd);
}


/**
 * initialse Google Analytics
 * don't force the browser to wait until  ga script loaded before running the rest of th js
 */
function initAnalytics(){
	var accountId = 'UA-2764682-9';
	jQuery.getScript('http://www.google-analytics.com/ga.js', function(){
		try {
			var pageTracker = _gat._getTracker(accountId);
			pageTracker._trackPageview();
		} catch(err) {}
	});
}


/**
 * jCarousel
 */
function itemVisibleIn(carousel, item, i, state, evt){
	var idx = carousel.index(i, $('#images ol li').length);
	var h = $($('#images li')[idx - 1]).html();
	carousel.add(i, h);
}

function itemVisibleOut(carousel, item, i, state, evt){
  carousel.remove(i);
}

function initCarousel(){
	$('#images ol').hide();
	$('#images-clip').append('<ul id="carousel" class="jcarousel-skin-tango">');
	$('#carousel').jcarousel({
		vertical: true,
		scroll: 1,
		auto: 1,
		buttonNextHTML: null,
		buttonPrevHTML: null,
		wrap: 'circular',
		itemVisibleInCallback: {onBeforeAnimation: itemVisibleIn},
		itemVisibleOutCallback: {onAfterAnimation: itemVisibleOut}
	});
}


$(document).ready(function(){
	localiseTimestamp();
	initCarousel();
	initAnalytics();
});
