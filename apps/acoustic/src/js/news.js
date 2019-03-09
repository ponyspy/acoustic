$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		$('.panel_block.right').empty().append(data);
	});
});
