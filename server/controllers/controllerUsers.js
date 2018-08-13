const axios = require('axios')
const User = require('../models/modelUser')
const jwt = require('jsonwebtoken')

module.exports = {
  signUpUser: (req, res) => {
    let newUser = {
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      role: 'user'
    }

    User.create()
  },

  signInUser: (req, res) => {

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
    let accessToken = process.env.ACCESS_TOKEN_FB
    let url_user_fb = `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    axios.get(url_user_fb)
      .then(response => {
        let idFb = response.data.id
        let fullnameFb = response.data.name
        User.findOne({ idFb: idFb })
          .then(user => {
            if (user) {
              let token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY)
              res.status(201).json({
                message: 'Success To Login',
                data: user,
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
                  res.status(500).json({
                    message: 'Failed to create',
                    err: err.message
                  })
                })
            }
          })
          .catch(err => {
            res.status(500).json({
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