$(document).ready(function(){
	var tamCO=0, tamDir=0, tam=0;
	$("#hexa_cpu_co").regexMask(/^\d+$/);
	$("#hexa_cpu_dir").regexMask(/^\d+$/);
	$("#hexa_cpu_pc").regexMask(/^[0-9A-Fa-f]+$/);
	$("#hexa_cpu_add").regexMask(/^[0-9A-Fa-f]+$/);
	$("#hexa_cpu_sub").regexMask(/^[0-9A-Fa-f]+$/);
	$("#hexa_cpu_store").regexMask(/^[0-9A-Fa-f]+$/);
	$("#hexa_cpu_load").regexMask(/^[0-9A-Fa-f]+$/);

	$("#hexa_cpu_co").change(function(){
		$("#hexa_cpu_add").attr({maxlength: this.value});
		$("#hexa_cpu_sub").attr({maxlength: this.value});
		$("#hexa_cpu_store").attr({maxlength: this.value});
		$("#hexa_cpu_load").attr({maxlength: this.value});
		if (this.value != ""){
			tamCO = parseInt(this.value)*4;
			if(tamCO==0)
				tamCO=0;
		}
		else
			tamCO = 0;

		if ($("#hexa_cpu_dir").val() != ""){
			tam = tamCO + tamDir;
			$("#hexa_cpu_pc").attr({maxlength: tam.toString()});
			$("#c").text(tamCO);
		}
		else{
			tam = tamCO;
			$("#c").text(tamCO-1);
			$("#hexa_cpu_pc").attr({maxlength: this.value});
		}
		$("#b").text(tamCO-1);
		$("#d").text(tam-1);
	});

	$("#hexa_cpu_dir").change(function(){
		if (this.value != ""){
			tamDir = parseInt(this.value)*4;
			if(tamDir==0)
				tamDir=0;
		}
		else
			tamDir = 0;

		if ($("#hexa_cpu_co").val() != ""){
			tam = tamCO + tamDir;
			$("#c").text(tamCO);
			$("#hexa_cpu_pc").attr({maxlength: tam.toString()});
		}
		else{
			tam = tamDir;
			$("#c").text(0);
			$("#hexa_cpu_pc").attr({maxlength: this.value});
		}
		$("#b").text(tamCO-1);
		$("#d").text(tam-1);
	});

	$("#create_hexa_cpu").on('click', function(e){
		var name = $("#name").val().replace(/\s/g,"");
		if (name==="" || name===undefined){
            alert("El nombre del ejercicio debe ser especificado");
            e.preventDefault();
		}
	});
});