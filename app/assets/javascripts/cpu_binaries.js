$(document).ready(function(){
	$("#cpu_binary_co").regexMask(/^\d+$/);
	$("#cpu_binary_dir").regexMask(/^\d+$/);
	$("#cpu_binary_pc").regexMask(/^[01]+$/);
	$("#cpu_binary_add").regexMask(/^[01]+$/);
	$("#cpu_binary_sub").regexMask(/^[01]+$/);
	$("#cpu_binary_store").regexMask(/^[01]+$/);
	$("#cpu_binary_load").regexMask(/^[01]+$/);

	$("#cpu_binary_co").change(function(){
		$("#cpu_binary_add").attr({maxlength: this.value});
		$("#cpu_binary_sub").attr({maxlength: this.value});
		$("#cpu_binary_store").attr({maxlength: this.value});
		$("#cpu_binary_load").attr({maxlength: this.value});

		console.log($("#cpu_binary_dir").val());
		console.log(this.value);
		if ($("#cpu_binary_dir").val() != ""){
			var tam = parseInt(this.value) + parseInt($("#cpu_binary_dir").val());
			$("#cpu_binary_pc").attr({maxlength: tam.toString()});
		}
		else{
			$("#cpu_binary_pc").attr({maxlength: this.value});
		}
	});

	$("#cpu_binary_dir").change(function(){
		console.log(this.value);
		console.log($("#cpu_binary_co").val());
		if ($("#cpu_binary_co").val() != ""){
			var tam = parseInt(this.value) + parseInt($("#cpu_binary_co").val());
			$("#cpu_binary_pc").attr({maxlength: tam.toString()});
		}
		else{
			$("#cpu_binary_pc").attr({maxlength: this.value});
		}
	});
});