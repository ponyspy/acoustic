$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		$('.menu_close').trigger('click');
		$('.panel_block.right').children('.panel_inner').empty().append(data);
	});
});
