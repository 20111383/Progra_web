const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./dao/models')

const PORT = 5000
const app = express() 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(express.static('assets')) //soporte de archivos estaticos
app.set('view engine', 'ejs') //configuramos el motor de templates
app.use(session({
    secret : "yup",
    resave : false,
    saveUninitialized : false
})) //configuracion de servidor para trabajar sessiones


//ENDPOINT
app.get('/', (req, res) => {
    const listaEventos = [
        {
            id : 1,
            nombre : 'Torneo Marzo 2021'
        },
        {
            id : 2,
            nombre : 'Torneo Abril 2021'
        },
        {
            id : 3,
            nombre : 'Torneo Mayo 2021'
        }
    ]

    const listaTopPlayer = [
        {
            nombre : 'billy',
            maps : 45,
            rounds : 37,
            k_d : 5,
            k__d : 5,
            rating : 9
        },
        {
            nombre : 'joaquin',
            maps : 40,
            rounds : 33,
            k_d : 6,
            k__d : 5,
            rating : 6
        },
        {
            nombre : 'alessandra',
            maps : 47,
            rounds : 17,
            k_d : 2,
            k__d : 1,
            rating : 4
        }
    ]

    res.render('index', {
        eventos : listaEventos, //[],
        topPlayers : listaTopPlayer
    })
})

app.get('/torneos', async (req, res)=> {
    const timestampActual = new Date().getTime();
    const dif = timestampActual - req.session.lastLogin

    if (dif >= 3 * 60 * 60 * 1000) {
        req.session.destroy() //destruyes la sesion
        res.render('/login')
    }else{

      //Obtener torneos de la base de datos
      const torneos = await db.Torneo.findAll({
          order : [
              ['id', 'DESC'],
          ]
      });
      //console.log(torneos);
      res.render('torneos', {
          torneos: torneos
      })
    }
})

app.get('/torneos/new', (req, res) => {
    res.render('torneos_new')
})

//Guardar datos del formulario de nuevo torneo
app.post('/torneos/new', async (req, res) => {
    const torneoNombre = req.body.torneo_nombre
    const torneoFecha = req.body.torneo_fecha

    await db.Torneo.create({
        nombre : torneoNombre,
        fecha : torneoFecha,
        estado: 1
    })

    res.redirect('/torneos')
})

// path parameter: torneos/modificar/#numero_de_usuario
// query parameter: torneos/modificar?id=#numero_de_usuario
app.get('/torneos/modificar/:codigo', async (req, res) => {
    const idTorneo = req.params.codigo

    const torneo = await db.Torneo.findOne({
        where : {
            id : idTorneo
        }
    })

    res.render('torneos_update', {
        torneo : torneo
    })
})

app.post('/torneos/modificar', async (req, res) => {
    const idTorneo = req.body.torneo_id
    const nombre = req.body.torneo_nombre
    const fecha = req.body.torneo_fecha

    //1. Obtener un torneo con id:idTorneo
    const torneo = await db.Torneo.findOne({
        where : {
            id : idTorneo
        }
    })
    //2. Cambiar sus propiedades / campos
    torneo.nombre = nombre
    torneo.fecha = fecha

    //3. Guardadi/Actualizado en la base de datos
    await torneo.save()

    res.redirect('/torneos')
})

app.get('/torneos/eliminar/:codigo', async (req, res) => {
    const idTorneo = req.params.codigo
    await db.Torneo.destroy({
        where : {
            id : idTorneo
        }
    })

    res.redirect('/torneos')
})

app.get('/login', (req, res)=> {
    if (req.session.username != undefined) {
        req.session.lastLogin = new Date().getTime()
        res.redirect("/torneos")
    }else{
        res.render('login')
    }
})

app.post('/login', (req, res)=> {
    const username = req.body.username
    const password = req.body.password

    if(username == "pw" && password == "123") {
        //Login correcto
        req.session.username = username //guardando variable en session
        res.redirect("/torneos")
    }else{
        res.redirect("/login")
    }
})

app.listen(PORT, () => {
    console.log(`El servidor se inicio correctamente en el puerto ${PORT}`)
})


