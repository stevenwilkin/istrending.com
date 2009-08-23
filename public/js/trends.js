function itemVisibleIn(carousel, item, i, state, evt){
	var idx = carousel.index(i, $('#images ol li').length);
	var h = $($('#images li')[idx - 1]).html();
	carousel.add(i, h);
}

function itemVisibleOut(carousel, item, i, state, evt){
  carousel.remove(i);
}

$(document).ready(function(){
	$('#images ol').hide();
	$('#images').append('<ul id="carousel" class="jcarousel-skin-tango">');
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
});
