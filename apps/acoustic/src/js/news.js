$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		var $data = $(data);

		$('title').text($('title').text().split(' / ').slice(0, 2).concat($data.find('.content_title').text().toLowerCase()).join(' / '));
		$('.menu_close').trigger('click');
		$('.panel_block.right').children('.panel_inner').empty().append($data);
	});
});
