const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db/mongodb')

const apiRouter = require('./apis')

app.use(cors())

app.use(express.json())
// const PORT = 4006

const PORT = process.env.PORT || 4006

// const { CarsRouter } = require('./routes')
// app.use('/api', CarsRouter)
// app.use(router)
app.use('/api/v1',apiRouter)

app.get('/',(req,res) => {
    res.send({
        message: 'Esto esta vivo'
    })
})

app.listen(PORT,() => {
    console.log(`Servidor conectado en el puerto ${PORT}`)
})