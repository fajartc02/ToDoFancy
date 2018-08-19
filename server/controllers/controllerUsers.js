const axios = require('axios')
const User = require('../models/modelUser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

module.exports = {
  signUpUser: (req, res) => {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    let newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    }
    newUser.password = hash
    User.create(newUser)
    .then(user => {
      res.status(201).json({
        message: 'Success to create user',
        data: user
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'failed To create',
        err: err.message
      })
    })

  },

  signInUser: (req, res) => {
    let isUser = {
      email: req.body.email
    }
    User.findOne(isUser)
      .then(dataUser => {
        if (dataUser) {
          let isTrue = bcrypt.compareSync(req.body.password, dataUser.password); // true
          if (isTrue) {
            let token = jwt.sign({ id: dataUser.id, fullname: dataUser.fullname }, process.env.JWT_SECRET_KEY)
            // console.log(token);
            res.status(201).json({
              msg: 'Successfully to login',
              data: dataUser,
              token: token
            })
          } else {
            res.status(401).json({
              msg: 'Username or password wrong'
            })
          }
        } else {
          res.status(400).json({
            msg: 'Cannot Found data'
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          msg: 'Failed to login',
          err: err.message
        })
      })
  },

  getDataUser: (req, res) => {
    User.find()
      .then(users => {
        res.status(200).json({
          message: 'Success to get data',
          data: users
        })
      })
      .catch(err => {
        res.status(500).json({
          message: 'Failed to get data',
          err: err.message
        })
      })
  },

  loginWithFacebook: (req, res) => {
    let accessToken = req.body.authRes.accessToken
    let url_user_fb = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    axios.get(url_user_fb)
      .then(response => {
        let idFb = response.data.id
        let fullnameFb = response.data.name
        User.findOne({ idFb: idFb })
          .then(user => {
            if (user) {
              let token = jwt.sign({ id: user._id, fullname: user.fullname }, process.env.JWT_SECRET_KEY)
              res.status(201).json({
                message: 'Success To Login',
                data: user.data,
                token: token
              })
            } else {
              let newUser = {
                fullname: fullnameFb,
                email: req.body.email,
                idFb: idFb,
                role: 'admin'
              }
              User.create(newUser)
                .then(user => {
                  res.status(201).json({
                    message: 'Success Create',
                    data: user
                  })
                })
                .catch(err => {
                  res.status(401).json({
                    message: 'Failed to create',
                    err: err.message
                  })
                })
            }
          })
          .catch(err => {
            res.status(401).json({
              message: 'Fail',
              err: err.message
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'error',
          err: err.message
        })
      })
  }
}