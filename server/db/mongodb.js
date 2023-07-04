const mongoose = require('mongoose')

const url = 'mongodb+srv://noraprogramadora1:hUMjpvY448ph4MjA@cluster0.irtngxy.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(url)
.then((res) => console.log('Conexion a la base de datos exitosa'))
.catch((error) => {
    console.log(error)
})

module.exports = mongoose