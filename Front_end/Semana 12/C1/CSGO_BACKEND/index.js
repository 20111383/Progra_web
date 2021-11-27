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
      const torneos = await db.Torneo.findAll();
      //console.log(torneos);
      res.render('torneos', {
          torneos: torneos
      })
    }
})

app.get('/torneos/new', (req, res) => {
    res.render('torneos_new')
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


