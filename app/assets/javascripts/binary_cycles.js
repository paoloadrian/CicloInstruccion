$(document).ready(function(){
	var co, origen, destino, contenido, pc = $("#pc").val(), dirRam, regRam;
    var tamDIR = parseInt($("#dir").val()), tamCO = parseInt($("#co").val()), tam = $("#pc").val().length;
    var paso = 1, cantInstrucciones, instruccionesEjecutadas = 0, instruccion;
    var ejec = false, repetirStore = false, NuevaInstruccion = false;
    var cods = { $("#load").val(), $("#add").val(), $("#sub").val(), $("#store").val() };
	$('input[type="text"]').each(function () {
		$(this).regexMask(/^[01]+$/);
	});

});

function captacion(){
    var resp = false;
    switch (paso){
        case 1:
            if ("pc" == origen && "mar" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 2:
            if ("mar" == origen && "busDirs" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 3:
            if ("busDirs" == origen && "ram" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 4:
            if ("ram" == origen && "busDatos" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 5:
            if ("busDatos" == origen && "mbr" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 6:
            if ("mbr" == origen && "ir" == destino)
            {
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 7:
            if (incrementoPC()){
                resp = true;
                console.log("PC + 1 -> PC");
                paso = 1;
                obtenerCO();
                imprimirCO();
                ejec = true;
                alert("Ciclo de captación TERMINADO");
            }
            break;
    }
    return resp;
}

function obtenerCO(){
    co = "";
    for (var i = 0; i < tamCO; i++){
        co = co + $("#binary_ir").val().charAt(i);
    }
    for (var i = 0; i < 4; i++){
        if (co == cods[i])
            instruccion = i;
    }
}

function imprimirCO(){
    switch (instruccion){
        case 0:
            console.log("");
            console.log("Ejecucion LOAD:");
            break;
        case 1:
            console.log("");
            console.log("Ejecucion ADD:");
            break;
        case 2:
            console.log("");
            console.log("Ejecucion SUB:");
            break;
        case 3:
            console.log("");
            console.log("Ejecucion STORE:");
            break;
    }
}

function incrementoPC(){
   if (sumarBinario(pc, DecimalABinario(1, tam), tam) == $("#binary_pc").val()){
       pc = $("#binary_pc").val();
       return true;
   }
   return false;
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
        cosciente = ~~(cosciente / 2);
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

function copiarIR(){
    var dir = "";
    for (var i = 0; i < tamCO; i++){
        dir = dir + "0";
    }
    for (var i = tamCO; i < tam; i++){
        dir = dir + $("#binary_ir").val().charAt(i);
    }
    contenido = dir;
}

function SumaCorrecta(){
    if (sumarBinario($("#binary_ac").val(), $("#binary_dr").val(), tam) == $("#binary_alu").val())
        return true;
    return false;
}

function RestaCorrecta(){
    if (restarBinario($("#binary_ac").val(), $("#binary_dr").val(), tam) == $("#binary_alu").val())
        return true;
    return false;
}

function ALU(){
    var resp = false;
    switch (paso){
        case 1:
            if ("ir" == origen && "mar" == destino){
                copiarIR();
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 2:
            if ("mar" == origen && "busDirs" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 3:
            if ("busDirs" == origen && "ram" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 4:
            if ("ram" == origen && "busDatos" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 5:
            if ("busDatos" == origen && "mbr" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 6:
            if ("mbr" == origen && "dr" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 7:
            if (co == cods[1]){
                if (SumaCorrecta()){
                    resp = true;
                    console.log("ar + dr -> alu");
                    paso++;
                    alert("Suma correcta");
                }
            }
            else{
                if (co == cods[2]){
                    if (RestaCorrecta()){
                        resp = true;
                        console.log("ar - dr -> alu");
                        paso++;
                        alert("Resta correcta");
                    }
                }
            }
            break;
        case 8:
            if ("alu" == origen && "ac" == destino){
                resp = true;
                paso = 1;
                ejec = false;
                console.log(origen + " -> " + destino);
                alert("ADD TERMINADO");
                instruccionesEjecutadas++;
                comprobarFinal();
            }
            else
                alert("Secuencia incorrecta");
            break;
        default:
            return false;
    }
    return resp;
}

function comprobarFinal(){
    if (instruccionesEjecutadas < cantInstrucciones){
        console.log("");
        console.log("Captacion: ");
    }
    else{
        console.log("Programa Finalizado");
        alert("Programa Finalizado");
        paso = 0;
    }
}

function Load(){
    var resp = false;
    switch (paso){
        case 1:
            if ("ir" == origen && "mar" == destino){
                copiarIR();
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 2:
            if ("mar" == origen && "busDirs" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 3:
            if ("busDirs" == origen && "ram" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 4:
            if ("ram" == origen && "busDatos" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    resp = true;
                    console.log(origen + "[" + dirRam + "]" + " -> " + destino);
                    paso++;
                }
                else
                    alert("Dirección de Memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 5:
            if ("busDatos" == origen && "mbr" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else
                alert("Secuencia incorrecta");
            break;
        case 6:
            if ("mbr" == origen && "ac" == destino){
                resp = true;
                console.log(origen + " -> " + destino);
                paso = 1;
                ejec = false;
                instruccionesEjecutadas++;
                alert("LOAD TERMINADO");
                comprobarFinal();
            }
            else
                alert("Secuencia incorrecta");
            break;
        default:
            return false;
    }
    return resp;
}

function Store()
{
    var resp = false;
    switch (paso){
        case 1:
            if ("ir" == origen && "mar" == destino){
                copiarIR();
                repetirStore = true;
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else{
                if ("ac" == origen && "mbr" == destino){
                    repetirStore = false;
                    resp = true;
                    console.log(origen + " -> " + destino);
                    paso++;
                }
                else
                    alert("Secuencia incorrecta");
            }
            break;
        case 2:
            if ("ir"`== origen && "mar"`== destino && !repetirStore){
                copiarIR();
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else{
                if ("ac" == origen && "mbr" == destino && repetirStore){
                    resp = true;
                    console.log(origen + " -> " + destino);
                    paso++;
                }
                else
                    alert("Secuencia incorrecta");
            }
            break;
        case 3:
            if ("mar" == origen && "busDirs" == destino){
                resp = true;
                repetirStore = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else{
                if ("mbr" == origen && "busDatos" == destino){
                    resp = true;
                    repetirStore = false;
                    console.log(origen + " -> " + destino);
                    paso++;
                }
                else
                    alert("Secuencia incorrecta");
            }
            break;
        case 4:
            if ("mar" == origen && "busDirs" == destino && !repetirStore){
                resp = true;
                console.log(origen + " -> " + destino);
                paso++;
            }
            else{
                if ("mbr" == origen && "busDatos" == destino && repetirStore){
                    resp = true;
                    console.log(origen + " -> " + destino);
                    paso++;
                }
                else
                    alert("Secuencia incorrecta");
            }
            break;
        case 5:
            if ("busDatos" == origen && "ram" == destino){
                if ($("#binary_dir_bus").val() == dirRam){
                    $("#"+regRam).value = contenido;
                    resp = true;
                    console.log(origen + " -> " + destino + "[" + dirRam + "]");
                    paso = 1;
                    ejec = false;
                    instruccionesEjecutadas++;
                    alert("STORE terminado");
                    comprobarFinal();
                }
                else
                    alert("Dirección de memoria incorrecta");
            }
            else
                alert("Secuencia incorrecta");
            break;
        default:
            return false;
    }
    return resp;
}


function ejecucion(){
    var resp = true;
    switch (instruccion){
        case 0://load
            resp = Load();
            break;
        case 3://store
            resp = Store();
            break;
        default:
            resp = ALU();
            break;
    }
    return resp;
}

function correcto(){
    var resp = false;
    if (cantInstrucciones == instruccionesEjecutadas){
        alert("Programa Finalizado");
    }
    else{
        if (!ejec)
            resp = captacion();
        else
            resp = ejecucion();
    }
    return resp;
}