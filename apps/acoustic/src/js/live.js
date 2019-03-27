$(window).on('load hashchange', function(e) {
	if (!location.hash || location.hash == '#') return false;

	$.post('', { id: location.hash.replace('#', '') }).done(function(data) {
		$('.panel_block.right').children('.panel_inner').empty().append(data);
	});
});

$(function() {
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