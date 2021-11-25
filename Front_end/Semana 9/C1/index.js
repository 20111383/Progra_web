const express = require('express')
const bodyParser = require('body-parser')

const PORT = 4444;
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))
app.use(express.static('assets')) // configurando soporte de archivos estaticos
app.set("view engine", "ejs") // configurando motor de templates

// Endpoints
app.get('/ejemplo1', (req, res) => {
    const textoRespuesta = "Hola PW"
    res.send(textoRespuesta)
})

app.get('/ejemplo2', (req, res) => {
    const htmlRespuesta = "<h1>Hola PW</h1>"
    res.send(htmlRespuesta)
})

// Recibir data mediante el path
// http://localhost:4444/ejemplo3/billy/20192323
app.get('/ejemplo3/:nombre/:codigo', (req, res) => {
    const nombreUsuario = req.params.nombre
    const htmlRespuesta = "<h1>Hola " + nombreUsuario + "</h1>" + 
        "<h2>" + req.params.codigo + "</h2>"
    res.send(htmlRespuesta)
})

// Recibir data medianter query parameters
// Ejm: http://localhost:4444/ejemplo4?nombre=billy&codigo=20192323
app.get('/ejemplo4', (req, res) => {
    const nombreUsuario = req.query.nombre
    const codigo = req.query.codigo
    const htmlRespuesta = "<h1>Hola " + nombreUsuario + "</h1>" + 
        "<h2>" + codigo + "</h2>"
    res.send(htmlRespuesta)
})

// Recibir data por medio de forms
// Endpoint para mostrar el formulario
app.get('/ejemplo5-formulario', (req, res)=> {
    res.render('formulario')
})

// Endpoint que recibe los datos del formulario
app.post('/ejemplo5-formulario', (req, res) => {
    console.log("data_form", req.body)
    //res.send(`<img src='/images/logo.png'/><script src='/js/index.js'></script><h1>${req.body.frm_nombre}</h1><h2>${req.body.frm_codigo}</h2>`) // interpolacion de strings
    res.render('formulario_respuesta', {
        codigo : req.body.frm_codigo,
        nombre : req.body.frm_nombre
    })
})

app.listen(PORT, () => {
    console.log('Se ha iniciado el servidor en el puerto ' + PORT)
})