const express = require('express')

const app = express()
const PORT = 4444;

//Endpoint
app.get('/ejemplo1', (req, res) => {
    const textoRespuesta = "Hola PW"
    res.send(textoRespuesta)
})

app.get('/ejemplo2', (req, res) => {
    const htmlRespuesta = "<h1>Hola PW</h1>"
    res.send(htmlRespuesta)
})
//recibir data mediante el patch
//http://localhost:4444/ejemplo3/billy/20192323
app.get('/ejemplo3/:nombre/:codigo', (req, res) => {
    const nombreUsuario = req.params.nombre
    const htmlRespuesta = "<h1>Hola " + nombreUsuario + "</h1>" +
    "<h2>" + req.params.codigo + "</h2>"
    res.send(htmlRespuesta)
})

//recibir data mediante query parameters
//http://localhost:4444/ejemplo4?nombre=billy&codigo=20192323
app.get('/ejemplo4', (req, res) => {
    const nombreUsuario = req.query.nombre
    const codigo = req.query.codigo
    const htmlRespuesta = "<h1>Hola " + nombreUsuario + "</h1>" +
        "<h2>" + codigo + "</h2>"
    res.send(htmlRespuesta)
})

//recibir data por medio de forms
//hEndpoint para mostrar el forulario
app.get('/ejemplo5-formulario', (req, res) => {
    const formulario = "<form>" + 
        "<div><input type='text'></input></div>" +
        "<div><input type='text'></input></div>" +
        "<div><button type='submit'>Enviar</button></div>" +
    "</form>"
    
    res.send(formulario)
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})