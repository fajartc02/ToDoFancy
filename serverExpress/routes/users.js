const router = require('express').Router()
const todoRouter = require('./todos')
const { getDataUser } = require('../controllers/controllerUsers')

router.use('/todo', todoRouter)
router.get('/', getDataUser)

module.exports = router