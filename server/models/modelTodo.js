const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    task: {
        type: String
    },

    description: {
        type: String
    },

    status: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo