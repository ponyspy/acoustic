// $(function() {
// 	$('a').each(function() {
// 		var $this = $(this);
// 		var href = $this.attr('href').split('::');

// 		if (href[0] == 'nw') {
// 			$this.attr({'target': '_blank', 'href': href[1]});
// 		}
// 	});
// });


$(function() {
	$('a').each(function() {
		$(this).attr('target', '_blank');
	});
});