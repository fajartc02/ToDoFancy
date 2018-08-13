const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  idFb: {
    type: String,
    required: true
  },
  role: {
    type: String,
  }
}, {
    timestamps: true
  });

const User = mongoose.model('User', userSchema)

module.exports = User