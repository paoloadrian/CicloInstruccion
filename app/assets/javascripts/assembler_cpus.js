$(document).ready(function(){
	$("#assembler_cpu_pc").regexMask(/^[0-9]+$/);
	$("#assembler_cpu_architecture_1").change(function(){
		if($(this).is(':checked'))
			$("#directions").show();
	});
	$("#assembler_cpu_architecture_2").change(function(){
		if($(this).is(':checked'))
			$("#directions").hide();
	});
});