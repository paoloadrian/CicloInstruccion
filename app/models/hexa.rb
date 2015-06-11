class Hexa
	
	def sumarHexa(num1, num2, tam)
		res = hexaADecimal(num1) + hexaADecimal(num2)
	    return decimalAHexa(res, tam)
	end

	def decimalAHexa(num, tam)
	    hexa = ""
	    cosciente = num
	    while (cosciente > 1)
	        hexa = toHexa(cosciente % 16) + hexa
	        cosciente = cosciente / 16
	    end
	    hexa = toHexa(cosciente) + hexa
	    for i in hexa.length..(tam-1)
	        hexa = "0" + hexa
	    end
	    return hexa
	end

	def toHexa(num)
		case num
			when 10
				return "A"
			when 11
				return "B"
			when 12
				return "C"
			when 13
				return "D"
			when 14
				return "E"
			when 15
				return "F"
			else
				return num.to_s
		end
	end

	def hexaADecimal(num)
	    dec = 0
	    for i in 0..(num.length-1)
	        if (num[i] != '0')
	            dec = dec + toDec(num[i]) * (16 ** (num.length - 1 - i))
	        end
	    end
	    return dec
	end

	def toDec(num)
		case(num)
			when 'A'
				return 10
			when 'B'
				return 11
			when 'C'
				return 12
			when 'D'
				return 13
			when 'E'
				return 14
			when 'F'
				return 15
			else
				return num.to_i
		end
	end
end