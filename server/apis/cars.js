const express = require('express')
const router = express.Router()

const Cars = []

router.get('/', (req,res) => {
    res.json(Cars)
})

router.post('/', (req,res) => {
    const {licence, brand, color, model, lat, lng} = req.body
    if(licence && brand && color && model && lat && lng ) {
        const id = Cars.length + 1
        const newCar = {...req.body, id}
        console.log(newCar)
        res.json('Peticion recibida')
        Cars.push(newCar)
    } else {
        res.send('Error de almacenamiento en la peticion')
    }
})

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = Cars.findIndex(car => car.id === id);
    if (index !== -1) {
      Cars.splice(index, 1);
      res.json({ message: 'Registro eliminado correctamente' });
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = Cars.findIndex(car => car.id === id);
    if (index !== -1) {
      const { licence, brand, color, model, lat, lng } = req.body;
      if (licence && brand && color && model && lat && lng ) {
        Cars[index] = { ...req.body, id };
        res.json({ message: 'Registro actualizado correctamente' });
      } else {
        res.status(400).json({ error: 'Faltan campos obligatorios en la solicitud' });
      }
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
}); 
  
module.exports = router