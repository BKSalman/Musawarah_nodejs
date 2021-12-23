const express = require('express');
const router = express.Router();
const { User } = require('../models/User');

function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next()
    res.redirect('/')
  }

// router.get('/:id', (req, res) => {
//     User.findById(req.params.id, (err, foundUser) =>{
//         if (err){
//             req.flash("error", "something went wrong.")
//             res.redirect("/")
//         }
//         res.render("profile", {user: foundUser})
//     })
// })


router.get('/', (req, res, next) => {
    res.render('profile', { user: req.user });
});

module.exports = {path:"/profile", router};