$(function() {
	$('.event_title').on('click', function(e){
		e.preventDefault();

		var url = $(this).attr('href');

		$.post('/live', { id: url.split('/').slice(-1).pop() }).done(function(data) {
			var $data = $(data);

			$('.menu_close').trigger('click');
			$('title').text($('title').text().split(' / ').slice(0, 2).concat($data.find('.content_title').text().toLowerCase()).join(' / '));
			$('.content_block').find('.panel_block.right').addClass('show').children('.panel_inner').empty().append($data);
			$('.panel_block.right').scrollTop(0);

			history.pushState(null, null, url);
		});
	});

	$('.event_type').children('span').on('click', function(e) {
		var $this = $(this).parent();
		var type = $this.closest('.event_item').attr('class').split(' ')[1];

		if ($this.hasClass('active')) {
			$('.event_item').removeClass('hidden');
			$('.event_type').removeClass('active');
		} else {
			$('.event_item').addClass('hidden').filter('.' + type).removeClass('hidden').find('.event_type').addClass('active');
		}
	});

});