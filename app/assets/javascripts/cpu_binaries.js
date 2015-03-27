$("#cpu_binary_pc").keydown(function(e) {
    console.log(e.keyCode);
    if(e.keyCode === 49 || e.keyCode === 48 || e.keyCode === 8 ){
        console.log("binario");
    } else {
        e.preventDefault();
        console.log("bloqueado");
    }      
});