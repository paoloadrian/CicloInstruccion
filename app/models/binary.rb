class Binary
	def sumarBinario(num1, num2, tam)
		res = BinarioADecimal(num1) + BinarioADecimal(num2)
	    return DecimalABinario(res, tam)
	end

	def DecimalABinario(num, tam)
	    bin = ""
	    cosciente = num
	    while (cosciente > 1) do
	        bin = (cosciente % 2).to_s + bin
	        cosciente = cosciente / 2
	    end
	    bin = cosciente.to_s + bin
	    for i in bin.length..(tam-1)
	        bin = "0" + bin
	    end
	    return bin
	end

	def BinarioADecimal(num)
	    dec = 0
		for i in 0..(num.length-1)
	        if (c == '1')
	            dec = dec + 2 ** (num.length - 1 - i)
	        end
	    end
	    return dec
	end
end