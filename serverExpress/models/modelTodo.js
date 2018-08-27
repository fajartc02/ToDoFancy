const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema ({
    task: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    plainDate: {
        type: Date,
        required: true
    },

    status: {
        type: Boolean,
        default: false
    },
    UserId: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
    timestamps: true
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo