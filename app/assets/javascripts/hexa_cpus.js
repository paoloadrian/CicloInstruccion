$(document).ready(function(){
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

		if ($("#hexa_cpu_dir").val() != ""){
			var tam = parseInt(this.value) + parseInt($("#hexa_cpu_dir").val());
			$("#hexa_cpu_pc").attr({maxlength: tam.toString()});
		}
		else{
			$("#hexa_cpu_pc").attr({maxlength: this.value});
		}
	});

	$("#hexa_cpu_dir").change(function(){
		if ($("#hexa_cpu_co").val() != ""){
			var tam = parseInt(this.value) + parseInt($("#hexa_cpu_co").val());
			$("#hexa_cpu_pc").attr({maxlength: tam.toString()});
		}
		else{
			$("#hexa_cpu_pc").attr({maxlength: this.value});
		}
	});
	$("#hexa_cods input[type='text']").keyup(function(){
    	this.value = this.value.toUpperCase();
	});
	$("#hexa_cpu_pc").keyup(function(){
    	this.value = this.value.toUpperCase();
	});
});