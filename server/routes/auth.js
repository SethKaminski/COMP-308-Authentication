let express = require('express');
let router = express.Router();

/* GET login page. */
router.get('/login', (req, res, next) => {
    if (!req.user){
        res.render('auth/login', { 
            title: 'login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayname : '' }); // put everwhere you need the displayname
    } else {
        return res.redirect('/');
    }
  
});

/* GET register page. */
router.get('/register', (req, res, next) => {
  res.render('auth/register', { 
    title: 'register',
    messages: '' });
});

module.exports = router;