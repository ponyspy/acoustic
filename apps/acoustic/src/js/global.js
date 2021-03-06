$(function() {

	var search = {
		val: '', buf: '',
		checkResult: function() {
			if (this.buf != this.val) {
				this.buf = this.val;
				this.getResult.call(search, this.val);
			}
		},
		getResult: function (result) {
			$.post('/search', { text: result }).done(function(data) {
				$('.menu_close').addClass('show');
				$('.menu_open').addClass('hide');
				$('.menu_block').addClass('hidden');
				$('.search_block').addClass('show').empty().append(data);
			});
		}
	};

	$('.search_input')
		.on('keyup change', function(event) {
			search.val = $(this).val();
		})
		.on('focusin', function(event) {
			search.interval = setInterval(function() {
				search.checkResult.call(search);
			}, 600);
		})
		.on('focusout', function(event) {
			clearInterval(search.interval);
		});

		$('.menu_close').on('click', function(e) {
			$('.search_input').val('');
			$('.menu_block, .footer_block, .menu_close').removeClass('show');
			$('.search_block').removeClass('show').empty();
			$('.menu_block').removeClass('hidden');
			$('.menu_open').removeClass('hide');
		});

	$('.logo_block').on('click', function(e) {
		var state = $('.menu_block a.active').text();

		if (!/live|news/.test(state)) return true;

		e.preventDefault();

		$('.panel_block').removeClass('show');

		if ($('.search_block').hasClass('show')) {
			$('.search_block').find('.content_results').empty();
			$('.search_input').val('').focus();
		} else {
			$('.content_block').find('.panel_block.right').children('.panel_inner').empty();
			$('title').text($('title').text().split(' / ').slice(0, 2).join(' / '));
			history.pushState(null, null, '/' + state);
		}
	});

	$(document).on('click', '.result_item.event .event_type span', function(e) {
		var $this = $(this).parent();
		var type = $this.closest('.result_item.event').attr('class').split(' ')[2];

		if ($this.hasClass('active')) {
			$('.result_item.event').removeClass('hidden');
			$('.result_item.event .event_type').removeClass('active');
		} else {
			$('.result_item.event').addClass('hidden').filter('.' + type).removeClass('hidden').find('.event_type').addClass('active');
		}
	});


	$('.menu_open').on('click', function(e) {
		$(this).addClass('hide');
		$('.menu_block, .footer_block, .menu_close').toggleClass('show');
	});

	$('.search_logo').on('click', function(e) {
		$('.logo_block').toggleClass('hide');
		$('.search_input').toggleClass('show').focus();
	});

});