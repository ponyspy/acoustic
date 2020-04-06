$(function() {

	$('.news_item').on('click', function(e){
		e.preventDefault();

		var url = $(this).attr('href');

		$.post('/news', { id: url.split('/').slice(-1).pop() }).done(function(data) {
			var $data = $(data);

			$data.find('a').each(function() {
				$(this).attr('target', '_blank');
			});

			$('.menu_close').trigger('click');
			$('title').text($('title').text().split(' / ').slice(0, 2).concat($data.find('.content_title').text().toLowerCase()).join(' / '));
			$('.content_block').find('.panel_block.right').addClass('show').children('.panel_inner').empty().append($data);
			$('.panel_block.right').scrollTop(0);

			history.pushState(null, null, url);
		});
	});

});