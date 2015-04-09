$(document).ready(function(){
	$("input").each(function () {
		$(this).regexMask(/^[01]+$/);
	}
});