let express = require('express');
let router = express.Router();

let passport = require('passport');
let UserModel = require('../models/users');
let User = UserModel.User;

//check if authenticated
function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('auth/login');
  }
  next();
}

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('content/index', { 
    title: 'Home',
    username: req.user ? req.user.username : '' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('content/about', { 
    title: 'About',
    username: req.user ? req.user.username : '' });
});

/* GET Projects page. */
router.get('/projects', (req, res, next) => {
  res.render('content/projects', { 
    title: 'Projects',
    username: req.user ? req.user.username : '' });
});

/* GET Services page. */
router.get('/services', (req, res, next) => {
  res.render('content/services', { 
    title: 'Services',
    username: req.user ? req.user.username : '' });
});

/* GET Contact page. */
router.get('/contact', (req, res, next) => {
  res.render('content/contact', { 
    title: 'Contact',
    username: req.user ? req.user.username : '' });
});

module.exports = router;