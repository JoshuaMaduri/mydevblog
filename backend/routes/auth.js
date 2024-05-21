const express = require('express')
const router = express.Router()
const { signup, signin, signout, requireSignin } = require('../controllers/auth');

//validators
const {runValidation} = require('../validators')
const {userSignupValidator, userSigninValidator} = require('../validators/auth');
const user = require('../models/user');

router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);
router.get('/signout', signout);

//test
router.get('/secret', requireSignin, (req, res) => {
    console.log(req.auth)
    res.json({
        message : req.auth
    })
})

module.exports = router
