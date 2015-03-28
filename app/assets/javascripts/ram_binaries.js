$(document).ready(function(){
	for (var i=0;i<15;i++){
		$("#dir"+i).regexMask(/^[01]+$/);
		$("#cont"+i).regexMask(/^[01]+$/);
	}
});