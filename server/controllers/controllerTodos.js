const Todo = require('../models/modelTodo')

module.exports = {
  createTodo: (req, res) => {
    let newTodo = {
      task: req.body.task,
      description: req.body.description
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

  getTodos: (req, res) => {
    Todo.find({})
      .then(todos => {
        res.status(200).json({
          message: 'Success To get Todos',
          data: todos
        })
      })
      .catch(err => {
        res.status(500).json({
          messsage: 'Failed to get todo',
          err: err.message
        })
      })
  },

  editTodo: (req, res) => {
    let query = {
      _id: req.params.id
    }
    let id = req.params.id
    // console.log(id);
    Todo.findOne(query)
      .then(todo => {
        let newTodo = {
          task: todo.task || req.body.task,
          description: todo.description || req.body.description
        }
        Todo.update(todo._id, newTodo)
          .then(updated => {
            console.log(updated);
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

  mailerTodo: (req, res) => {
    data.Group.Members.forEach(member => {
      var smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "fajartc02@gmail.com",
          pass: "fajartc02"
        }
      });

      // setup e-mail data with unicode symbols

      var mailOptions = {
        from: "ToDo Fancy Apps ✔", // sender address
        to: `${member.email}`, // list of receivers //DINAMIS
        subject: "Reminder ToDo ✔", // Subject line
        text: "Hello Every  ✔", // plaintext body
        html: "<b>From localhost:3000</b><br>Hi! You are invited to our next QCC event on 7 September 2018." // html body
      }

      // send mail with defined transport object
      smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
          console.log(error);
        } else {
          console.log("Message sent: " + response);
        }
        // if you don't want to use this transport object anymore, uncomment following line
        smtpTransport.close(); // shut down the connection pool, no more messages
      });
    })
  }
}