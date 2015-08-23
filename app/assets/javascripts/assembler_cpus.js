$(document).ready(function(){
	$("#assembler_cpu_pc").regexMask(/^[0-9]+$/);
	$("#assembler_cpu_architecture_1").change(function(){
		if($(this).is(':checked'))
			$("#directions").fadeIn();
	});
	$("#assembler_cpu_architecture_2").change(function(){
		if($(this).is(':checked'))
			$("#directions").fadeOut();
	});
	$("#create_assembler_cpu").on('click', function(e){
		var name = $("#name").val().replace(/\s/g,"");
		if (name==="" || name===undefined){
            alert("El nombre del ejercicio debe ser especificado");
            e.preventDefault();
		}
	});
});