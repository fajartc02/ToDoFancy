const Todo = require('../models/modelTodo')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const User = require('../models/modelUser')
module.exports = {
  markCompleteTodo: (req, res) => {
    let id = {
      _id: req.body.id
    }
    Todo.update(id, { $set: { status: true } })
      .then(data => {
        res.status(201).json({
          message: 'Updated',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed',
          err: err.message
        })
      })
  },

  findOneTodo: (req, res) => {
    let id = {
      _id: req.params.id
    }
    Todo.findOne(id)
      .then(todo => {
        res.status(200).json({
          message: 'Successfully to get todo',
          data: todo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed to get one',
          err: err.message
        })
      })
  },

  createTodo: (req, res) => {
    let decode = jwt.verify(req.body.user, process.env.JWT_SECRET_KEY)
    let newTodo = {
      task: req.body.task,
      description: req.body.description,
      plainDate: req.body.plainDate,
      UserId: decode.id
    }
    Todo.create(newTodo)
      .then(todo => {
        res.status(201).json({
          message: 'Success To Create Todo',
          data: todo
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed to create Todo',
          err: err.message
        })
      })
  },

  getTodos: (req, res, next) => {
    let token = req.query.accessToken
    if (token) {
      let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
      let user = decode.fullname
      Todo.find({ UserId: decode.id })
        .populate('User', 'fullname')
        .then(todos => {
          res.status(200).json({
            message: 'Success To get Todos',
            data: todos,
            user: user
          })
          next()
        })
        .catch(err => {
          res.status(500).json({
            messsage: 'Failed to get todo',
            err: err.message
          })
        })
    } else {
      Todo.find({})
        .then(todos => {
          res.status(200).json({
            message: 'Success To get Todos',
            data: todos,
          })
        })
        .catch(err => {
          res.status(500).json({
            messsage: 'Failed to get todo',
            err: err.message
          })
        })
    }
  },

  editTodo: (req, res) => {
    let query = {
      _id: req.params.id
    }
    Todo.findOne(query)
      .then(todo => {
        let newTodo = {
          task: req.body.task || todo.task,
          description: req.body.description || todo.description,
          plainDate: req.body.plainDate || todo.plainDate
        }
        let id = {
          _id: todo._id
        }
        Todo.update(id, { $set: newTodo })
          .then(() => {
            res.status(201).json({
              message: 'data Updated',
              data: todo
            })
          })
          .catch(err => {
            res.status(500).json({
              message: 'data not updated',
              err: err.message
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: `data can't found`,
          err: err.message
        })
      })
  },

  removeTodo: (req, res) => {
    let query = {
      _id: req.params.id
    }
    Todo.remove(query)
      .then((removed) => {
        res.status(201).json({
          message: 'todo has been removed',
          data: removed
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'todo not removed',
          err: err.message
        })
      })
  },

  statusTodo: (req, res) => {
    let status = req.params.status
    let decode = jwt.verify(req.query.token, process.env.JWT_SECRET_KEY)
    Todo.find({ status: status, UserId: decode.id })
      .then(data => {
        res.status(200).json({
          message: 'Success',
          data: data
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Error',
          err: err.message
        })
      })
  },

  mailerTodo: (req, res) => {
    let id = {
      _id: req.body.data[0].UserId
    }
    User.findOne(id)
    .then(user => {
      var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fajartc02@gmail.com",
          pass: `${process.env.password}`
        }
      });
  
      // setup e-mail data with unicode symbols
  
      var mailOptions = {
        from: "ToDo Fancy Apps ✔", // sender address
        to: `${user.email}`, // list of receivers //DINAMIS
        subject: "Reminder ToDo ✔", // Subject line
        text: "Hello ✔", // plaintext body
        html: `"<b>From ToDO fancy Apps</b><br>Hi! you have ${JSON.stringify(req.body.data)} ToDO Today ! check in here http://localhost:8080/login.html"` // html body
      }
  
      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + JSON.stringify(response));
        }
        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'failed',
        err: err.message
      })
    })
  }
}