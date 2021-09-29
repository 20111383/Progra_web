const refranes = [
    "A CABALLO REGALADO NO SE LE MIRA EL DIENTE",
    "CAMARON QUE SE DUERME SE LO LLEVA LA CORRIENTE",
    "QUIEN HIERRO MATA A HIERRO MUERE"
]

let refran = ""
let refranOculto = ""
let cont = 0
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

const cargaNuevaImagen = (contador) =>{
    let img = document.querySelector("#imagen")
    img.setAttribute("src", "/Front_end/Semana 5/C2/img/hangman-" + contador + ".png")
}

const mostrarAlerta = (gano) =>{
    const divAlert = document.createElement("div")

    if(gano){
        divAlert.setAttribute("class", "alert alert-success mt-4")
        divAlert.innerText = "Ganador!!!"
    }else{
        divAlert.setAttribute("class", "alert alert-danger mt-4")
        divAlert.innerText = "PERDIO..."
    }
    const divParteDerecha = document.querySelector("#parte_derecha")
    divParteDerecha.appendChild(divAlert)
}

const letraInputOnkeypress = (evt) =>{
    const letraIngresada = evt.key.toUpperCase()
    const nuevoRefranOculto = buscarLetraRefran(letraIngresada, refran, refranOculto)
    if(refranOculto == nuevoRefranOculto){
        //no encontro una letra
        //ERROR
        if(cont < 6){
            cargaNuevaImagen(++cont)
            if(cont == 6){
                console.log("PERDIO")
                mostrarAlerta(false)
            }
        }
    }else{
        refranOculto = nuevoRefranOculto
        cargarRefran(refranOculto)

        if(refranOculto == refran){
            //GANO
            mostrarAlerta(true)
            console.log("GANO")
        }
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