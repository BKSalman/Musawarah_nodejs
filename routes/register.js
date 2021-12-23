const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { User } = require('../models/User');

router.get('/', (req, res)=>{
    res.render('register.ejs')
})

router.post('/', async (req, res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const username = req.body.username
        const email = req.body.email
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        })
        user.save()
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

module.exports = {path:"/register",router};