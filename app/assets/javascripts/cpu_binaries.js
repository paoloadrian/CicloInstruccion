	$('#cpu_binary_co').on('keydown',function(event){
		
		regexMask(/^\d+$/);
	};
	$('#cpu_binary_dir').regexMask(/^\d+$/);
	$('#cpu_binary_pc').regexMask(/^[01]+$/);
	$('#cpu_binary_load').regexMask(/^[01]+$/);
	$('#cpu_binary_store').regexMask(/^[01]+$/);
	$('#cpu_binary_add').regexMask(/^[01]+$/);
	$('#cpu_binary_sub').regexMask(/^[01]+$/);