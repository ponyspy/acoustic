$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		$('.panel_block.right').children('.panel_inner').empty().append(data);
	});
});

$(function() {
	$('.event_type').children('span').on('click', function(e) {
		var $this = $(this).parent();
		var type = $this.closest('.live_event').attr('class').split(' ')[1];

		if ($this.hasClass('active')) {
			$('.live_event').removeClass('hidden');
			$('.event_type').removeClass('active');
		} else {
			$('.live_event').addClass('hidden').filter('.' + type).removeClass('hidden').find('.event_type').addClass('active');
		}
	});
});