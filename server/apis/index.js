const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const authRouter = require('./auth')
const carsRouter = require('./cars')

const authMiddleware = require('../middleware/authorization')

router.use('/auth', authRouter)
router.use('/cars', carsRouter)

router.use(authMiddleware)
router.use('/users', usersRouter)

module.exports = router