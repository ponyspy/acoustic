// $(window).on('load hashchange', function(e) {
// 	if (!location.hash || location.hash == '#') return false;

// 	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
// 		var $data = $(data);

// 		$('title').text($('title').text().split(' / ').slice(0, 2).concat($data.find('.content_title').text().toLowerCase()).join(' / '));
// 		$('.menu_close').trigger('click');
// 		$('.panel_block.right').addClass('show').children('.panel_inner').empty().append($data);
// 	});
// });

$(function() {

	$('.news_item').on('click', function(e){
		e.preventDefault();

		var url = $(this).attr('href');

		$.post('/news', { id: url.split('/').slice(-1).pop() }).done(function(data) {
			var $data = $(data);

			$('.menu_close').trigger('click');
			$('title').text($('title').text().split(' / ').slice(0, 2).concat($data.find('.content_title').text().toLowerCase()).join(' / '));
			$('.content_block').find('.panel_block.right').addClass('show').children('.panel_inner').empty().append($data);

			history.pushState(null, null, url);
		});
	});

});