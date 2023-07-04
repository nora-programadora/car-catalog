const express = require('express')
const router = express.Router()
const userModel = require('../models/users')
const userService = require('../services/users')
// const { getUsers, getUserById, createUser, updateUser, removeUser } = require('../controllers/users')

const UserService = new userService(userModel)

router.get('/me', async (req, res) => {
  const sessionUser = req.user

  if(!sessionUser){
    return res.status(403).send({
        message: 'Sin permisos para acceder'
    })
  }

  res.send({
    name: sessionUser.name,
    email: sessionUser.email
  })
})

// router.get('/', async (req, res) => {
//   const users = await getUsers()
//   res.send(users)
// })

// router.get('/:id', async (req, res) => {
//   const { id } = req.params
//   const user = await getUserById(id)
//   if (!user) {
//     res.status(404)
//     return res.send({
//       message: `User: ${id} not found`
//     })
//   }
//   res.send(user)
// })

router.post('/', async (req, res) => {
    const body = req.body
    const user = await UserService.create(body)
    res.status(200).send(user)
  })

// router.post('/', async (req, res) => {
//   const newUser = req.body
//   try {
//     const createdUser = await createUser(newUser)
//     res.status(201)
//     res.send(createdUser)
//   } catch (error) {
//     console.log(error)
//     if (error instanceof mongoose.Error.ValidationError) {
//       res.status(400)
//       return res.send({
//         message: 'Error de validacion',
//         reason: error.message
//       })
//     }
//     res.status(500)
//     return res.send({
//       reason: error.message
//     })
//   }
// })

// router.put('/:id', async (req, res) => {
//   const { id } = req.params
//   const body = req.body

//   const updatedUser = await updateUser(id, body)
//   if (!updatedUser) {
//     res.status(404)
//     return res.send({
//       message: `User: ${id} not found`
//     })
//   }
//   res.send(updatedUser)
// })

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params
//   const result = await removeUser(id)
//   res.send(result)
// })

module.exports = router
