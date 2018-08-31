const router = require('express').Router()
const userRouter = require('./users')
const { loginWithFacebook, signInUser, signUpUser  } = require('../controllers/controllerUsers')

// router.use('/users', userRouter)

router.post('/signin/facebook', loginWithFacebook)
router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.get('/', function(req, res) {
    // console.log('routes Alive');
})

module.exports = router