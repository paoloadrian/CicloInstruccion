$(document).ready(function(){
	function esBinario(texto){
	    for (var i = 0; i < texto.length; i++){
	        if (texto.charAt(i) != '0' && texto.charAt(i) != '1')
	            return false;
	    }
	    return true;
	}

	function sumarBinario(num1, num2, tam){
	    var res = BinarioADecimal(num1) + BinarioADecimal(num2);
	    return DecimalABinario(res, tam);
	}

	function restarBinario(num1, num2, tam){
	    var res = BinarioADecimal(num1) - BinarioADecimal(num2);
	    return DecimalABinario(res, tam);
	}

	function DecimalABinario(num, tam){
	    var bin = "";
	    var cosciente = num;
	    while (cosciente > 1){
	        bin = (cosciente % 2).toString() + bin;
	        cosciente = cosciente / 2;
	    }
	    bin = cosciente.toString() + bin;
	    for (var i = bin.length; i < tam; i++){
	        bin = "0" + bin;
	    }
	    return bin;
	}

	function BinarioADecimal(num){
	    var dec = 0;
	    for (var i = 0; i < num.length; i++){
	        if (num.charAt(i) == '1')
	            dec = dec + Math.pow(2, num.length - 1 - i);
	    }
	    return dec;
	}
});