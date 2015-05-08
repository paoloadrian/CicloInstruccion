$(document).ready(function(){
	$("#assembler_cpu_pc").regexMask(/^[0-9]+$/);
	$("#assembler_cpu_architecture_1").change(function () {
		console.log(this.val());
		if(this.val() == 2)
			$("#directions").hide();
		else
			$("#directions").show();
	});
});