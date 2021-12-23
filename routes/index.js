const express = require('express');
const router = express.Router();

function isNotLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

/* GET home page. */
router.get('/', isNotLoggedIn, (req, res) => {
  console.log('get art')
  res.render("index", {messages:[
    '1',
    '2',
    '3'
  ]})
})

router.get('/new', (req, res) => {
  console.log('form')
  res.render("form")
})

module.exports = {path:"/",router};
