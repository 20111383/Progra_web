
const generarMatriz = () =>{
    var body = document.getElementsByTagName("body")[0];
    //var cuerpo = document.getElementById("matriz");
    var tabla = document.createElement("table");
    var tblcuerpo = document.createElement("tbody");


    for( var i = 1; i < 11;i++){
        var tr = document.createElement("tr")

        for(var j = 1; j < 11;j++){
            var td = document.createElement("td");
            var posicion = document.createTextNode(i+","+j);
            td.appendChild(posicion);
            tr.appendChild(td);
        }
        tblcuerpo.appendChild(tr)
    }
    tabla.appendChild(tblcuerpo);
  
    body.appendChild(tabla);
}

const seleccionarPosicion = () =>{
    /*var t = document.getElementsByTagName("table"),
        r = t.getElementsByTagName("tr"),
        d = r.getElementsByTagName("td");

    for(var i = 1; i < 11;i++){
    }
    var i = 1;
    var j = 1;
    const selecPos = document.getElementsByTagName("td")
    const pos = selecPos.value;
    if(pos == i){
        selecPos.value = 
    }*/
}

const main = () =>{
    generarMatriz();
}

window.addEventListener("load",main)