const URL_BACKEND = "https://60b83e68b54b0a0017c03380.mockapi.io/banners"

//const promiseOK = (response) => {
//    response.json().then((data) => {
//        const img = document.querySelector("#banner")
//        img.setAttribute("src", data[0].url)
//        //console.log(data[0].url)
//    }).catch((error) => {
//        console.error(error)
//    })
//}

const peticionConPromesas = () => {
    fetch(URL_BACKEND)
    .then((response) => {
        response.json().then((data) => {
            const img = document.querySelector("#banner")
            img.setAttribute("src", data[0].url)
        }).catch((error) => {
            console.error(error)
        })    
    }).catch((error) => {
        console.error(error)
    })
}

/////para banner////
let numImagen = 0 //global
let imagenes = [] //global

const cambiarImagenes = () => {
    const img = document.querySelector("#banner")
    
    if(imagenes.length == numImagen) {
        numImagen = 0;
    }
    img.setAttribute("src",imagenes[numImagen++].url)
}

const peticionConAsyncAwait = async () =>{
    const response = await fetch(URL_BACKEND)
    imagenes = await response.json()
    window.sessionStorage.setItem("imagenes", JSON.stringify(imagenes))
}

const main = () => {

    //abrir un canal de comunicacion con el servidor
    //Async - await
    //peticionConPromesas()
    //peticionConAsyncAwait()
    imagenes = JSON.parse(window.sessionStorage.getItem("imagenes"))
    if(imagenes == null) {
        peticionConAsyncAwait()
    }
    peticionConAsyncAwait()   
    window.setInterval(cambiarImagenes, 3000)

    const butBorrar = document.querySelector("#but_borrar")
    butBorrar.addEventListener("click", () => {
        window.sessionStorage.clear()
    })
}

window.addEventListener("load", main)