const router = require('express').Router()
const { createTodo, getTodos, removeTodo, editTodo } = require('../controllers/controllerTodos')

router.post('/create', createTodo)
router.get('/', getTodos)
router.put('/edit/:id', editTodo)
router.delete('/delete/:id', removeTodo)

module.exports = router