$(document).ready(function(){
	var tamCO=0, tamDir=0, tam=0;
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
		if (this.value != ""){
			tamCO = parseInt(this.value);
			if(tamCO==0)
				tamCO=0;
		}
		else
			tamCO = 0;

		if ($("#cpu_binary_dir").val() != ""){
			tam = tamCO + tamDir;
			$("#cpu_binary_pc").attr({maxlength: tam.toString()});
			$("#c").text(tamCO);
		}
		else{
			tam = tamCO;
			$("#c").text(tamCO-1);
			$("#cpu_binary_pc").attr({maxlength: this.value});
		}
		$("#b").text(tamCO-1);
		$("#d").text(tam-1);
	});

	$("#cpu_binary_dir").change(function(){
		if (this.value != ""){
			tamDir = parseInt(this.value);
			if(tamDir==0)
				tamDir=0;
		}
		else
			tamDir = 0;

		if ($("#cpu_binary_co").val() != ""){
			tam = tamCO + tamDir;
			$("#c").text(tamCO);
			$("#cpu_binary_pc").attr({maxlength: tam.toString()});
		}
		else{
			tam = tamDir;
			$("#c").text(0);
			$("#cpu_binary_pc").attr({maxlength: this.value});
		}
		$("#b").text(tamCO-1);
		$("#d").text(tam-1);
	});
});