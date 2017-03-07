let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');
let contact = require('../models/contacts');

//check if authenticated
function requireAuth(req, res, next) {
  if(!req.isAuthenticated()) {
    return res.redirect('/user/login');
  }
  next();
}

/* GET contacts page. */
router.get('/', requireAuth, (req, res, next) => {
  contact.find((err, contacts) => {
    if (err) {
      return console.error(err);
    } else {
      contacts.sort((a, b) => {
        var nameA = a.name.toUpperCase();
        var nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
      contacts.sort();
      res.render('contacts/index', {
         title: 'Contacts',
          contacts: contacts,
          username: req.user ? req.user.username : '' });
    }
  });
});

/* GET Add Contact page. */
router.get('/add', requireAuth, (req, res, next) => {    
    res.render('contacts/details', {
        title: 'Add Contacts',
        buttonText: 'Add',
        contacts: '',
        username: req.user ? req.user.username : ''});
});

/* Post Add Contact page. */
router.post('/add', requireAuth, (req, res, next) => {
  let newContact = new contact({
    "name": req.body.name,
    "number": req.body.number,
    "email": req.body.email
  });

  contact.create(newContact, (err) => {
    if (err) {
      console.error(err);
      res.end(error);
    } else {
        res.redirect('/contacts')
    }
  });
});

/* GET Edit Contact page. */
router.get('/edit/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  contact.findById(id, (err, contacts) => {
    if (err) {
      console.error(err);
      res.end(error);
    } else {
        res.render('contacts/details', {
          title: 'Edit Contact',
          buttonText: 'Edit',
          contacts: contacts,
          username: req.user ? req.user.username : '' });
    }
  });
});

/* Post Edit Contact page. */
router.post('/edit/:id', requireAuth, (req, res, next) => {
  let id = req.params.id;
  let editedContact = new contact({
    "_id": id,
    "name": req.body.name,
    "number": req.body.number,
    "email": req.body.email
  });

  console.log(id);
  console.log(editedContact);

  contact.update({_id: id}, editedContact, (err) => {
    if (err) {
      console.error(err);
      res.end(error);
    } else {
        res.redirect('/contacts')
    }
  });
});

module.exports = router;