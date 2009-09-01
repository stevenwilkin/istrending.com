/**
 * use the users browser to localise the 'last updated' field from UTC
 */
function localiseTimestamp(){
	var d = new Date($('#trends span').attr('title'));
	var pd = d.getHours() + ':' + d.getMinutes();
	$('#trends span').html(pd);
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
});
