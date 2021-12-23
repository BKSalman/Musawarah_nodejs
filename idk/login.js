const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/User');
const passport = require('passport')
const initializePassport = require('../passport-config')

initializePassport(
    passport,
    email => User.find(user => user.email ===email)
    )

router.get('/', (req, res)=>{
    res.render('login.ejs')
})

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

module.exports = {path:"/login",router};