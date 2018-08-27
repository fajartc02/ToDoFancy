const router = require('express').Router()
const { createTodo, getTodos, removeTodo, editTodo, findOneTodo, statusTodo, markCompleteTodo, mailerTodo } = require('../controllers/controllerTodos')

router.post('/create', createTodo)
router.get('/', getTodos)
router.post('/sendEmail', mailerTodo)
router.get('/:id', findOneTodo)
router.get('/completed/:status', statusTodo)
router.post('/markComplete', markCompleteTodo)
router.put('/edit/:id', editTodo)
router.delete('/delete/:id', removeTodo)

module.exports = router