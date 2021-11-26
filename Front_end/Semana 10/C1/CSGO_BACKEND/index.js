const express = require('express')

const PORT = 5000
const app = express() 

app.use(express.static('assets')) //soporte de archivos estaticos
app.set('view engine', 'ejs') //configuramos el motor de templates


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

app.listen(PORT, () => {
    console.log(`El servidor se inicio correctamente en el puerto ${PORT}`)
})
