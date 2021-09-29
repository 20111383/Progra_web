const refranes = [
    "A CABALLO REGALADO NO SE LE MIRA EL DIENTE",
    "CAMARON QUE SE DUERME SE LO LLEVA LA CORRIENTE",
    "QUIEN HIERRO MATA A HIERRO MUERE"
]

var refran = ""
var refranOculto = ""

const elegirRefran = () =>{
    const pos = Math.round(Math.random()*2);
    return refranes[pos]
}

const ocultarRefran = (refran) =>{
    var refranOcultado = ""
    for(var caracter of refran){
        if(caracter != " "){
            //debo ocultar el caracter
            refranOcultado += "_"
        }else{
            //no debo ocultar el caracter
            refranOcultado += caracter
        }
    }
    return refranOcultado
}

const cargarRefran = (refran) =>{
    const divRefran = document.getElementById("refran")
    divRefran.innerText = refran
}

const buscarLetraRefran = (letra, refran, refranOculto) =>{
    let nuevoRefranOculto = ""
    for(let i=0; i < refran.length; i++){
        if(letra == refran[i]){
            //se encuentra la letra
            nuevoRefranOculto += refran[i]
        }else{
            nuevoRefranOculto += refranOculto[i]
        }
    }
    return nuevoRefranOculto;
}

const letraInputOnkeypress = (evt) =>{
    const letraIngresada = evt.key.toUpperCase()
    const nuevoRefranOculto = buscarLetraRefran(letraIngresada, refran, refranOculto)
    if(refranOculto == nuevoRefranOculto){
        //no encontro una letra
        console.log("deberia mostrar una imagen")
    }else{
        refranOculto = nuevoRefranOculto
        cargarRefran(refranOculto)
    }
}

const main = () =>{
    refran = elegirRefran()
    refranOculto = ocultarRefran(refran)
    
    cargarRefran(refranOculto)

    let inputLetras = document.querySelector("#letras")
    inputLetras.addEventListener("keypress", letraInputOnkeypress)
}

window.addEventListener("load",main)