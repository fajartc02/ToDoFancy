require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const indexRouter = require('./routes/index')
const cors = require('cors')
const mongoose = require('mongoose')
const axios = require('axios')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(cors())

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log("Connected dabatase success")
})

app.use('/', indexRouter)

app.listen(port, function() {
    console.log(`listen on port ${port}`);
})