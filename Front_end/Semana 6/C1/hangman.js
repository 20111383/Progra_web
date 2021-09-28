const refranes = [
    "A CABALLO REGALADO NO SE LE MIRA EL DIENTE",
    "CAMARON QUE SE DUERME SE LO LLEVA LA CORRIENTE",
    "QUIEN HIERRO MATA A HIERRO MUERE"
]
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

const main = () =>{
    const refran = elegirRefran()
    const refranOculto = ocultarRefran(refran)
    
    cargarRefran(refranOculto)
}

window.addEventListener("load",main)