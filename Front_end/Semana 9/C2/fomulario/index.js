const express = require('express')
const bodyParser = require('body-parser')

//configuracion del servidor
const PORT = 4444;
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(express.static('assets')) //configurando soporte de archivos estaticos

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
//Endpoint para mostrar el forulario
app.get('/ejemplo5-formulario', (req, res) => {
    const formulario = "<form method='post' action='/ejemplo5-formulario'>" + 
        "<div><input name='frm_nombre' type='text'/></div>" +
        "<div><input name='frm_codigo' type='text'/></div>" +
        "<div><button type='submit'>Enviar</button></div>" +
    "</form>"
    
    res.send(formulario)
})

//Endpoint para mostrar el forulario
app.post('/ejemplo5-formulario', (req, res) => {
    console.log("data_form", req.body)
    res.send(`<img src='/images/logo.png'/><script src='/js/index.js'></script><h1>${req.body.frm_nombre}</h1><h2>${req.body.frm_codigo}</h2>`) //interpolacion de strings
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})