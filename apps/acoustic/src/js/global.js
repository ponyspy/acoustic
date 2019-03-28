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
			$('.menu_close').removeClass('show');
			$('.search_block').removeClass('show').empty();
			$('.menu_block').removeClass('hidden');
		});

});