var numeroIngresado;
var enOperacion = false;
var operacionActual;

const sumar = (sum1, sum2) => {
    return sum1 + sum2;
}

const restar = (n1, n2) => {
    return n1 - n2;
}

const numeroOnClick = (numero) => {
    const inputNumeros = document.getElementById("txt_numeros")
    const numeroStr = inputNumeros.value;
    if (numeroStr == "0" || enOperacion) {
        inputNumeros.value = numero;
        enOperacion = false;
    }else {
        inputNumeros.value = numeroStr + numero;
    }
}

const numeroOnClickNoObstrusivo = (evt) =>{
    const but = evt.target;
    const numero = but.innerHTML;
    console.log(evt);
    numeroOnClick(numero)
}

const operacionOnClick = (operacion) => {
    const inputNumeros = document.getElementById("txt_numeros")
    if (operacion == "C") {
        inputNumeros.value = "0";
    }else if (operacion == "+") {
        const numero = inputNumeros.value
        numeroIngresado = parseInt(numero)
        enOperacion = true;
        operacionActual = sumar;
    }else if (operacion == "-") {
        const numero = inputNumeros.value
        numeroIngresado = parseInt(numero)
        enOperacion = true;
        operacionActual = restar;
    }else if (operacion == "=") {
        if (operacionActual != undefined) {
            const numero = inputNumeros.value
            const res = operacionActual(numeroIngresado, parseInt(numero))
            inputNumeros.value = res;
        }
    }
}

const operacionOnClickNoObstrusivo = (evt) =>{
    const but = evt.target;
    const op = but.innerHTML;
    operacionOnClick(op)

}

const main = () =>{

    for (var i= 0; i < 10; i++){
        const but = document.getElementById("but" + i)
        but.onclick = numeroOnClickNoObstrusivo
    }

    const arrOperaciones = ["+", "-", "C", "=" ]
    for (var op of arrOperaciones){
        const but = document.getElementById("but" + op)
        but.onclick = operacionOnClickNoObstrusivo
    }
}

/*
main();
window.onload = main;
*/
window.addEventListener("load", main);