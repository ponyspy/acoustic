$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		$('.panel_block.right').empty().append(data);
	});
});

$(function() {
	$('.event_type').children('span').on('click', function(e) {
		var $this = $(this).parent();
		var type = $this.attr('class').split(' ')[1];

		if ($this.hasClass('active')) {
			$('.live_event').removeClass('hidden');
			$('.event_type').removeClass('active');
		} else {
			$this.addClass('active');
			$('.live_event').addClass('hidden');
			$('.live_event').find('.' + type).closest('.live_event').removeClass('hidden');
		}
	});
});