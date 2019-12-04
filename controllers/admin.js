const { validationResult } = require('express-validator');
const { createToken } = require('../libs/auth');
const { Admin } = require('../models');

module.exports = {
  signUp: (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    Admin.create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password
    })
      .then(result => {
        res.status(201).send(result);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  },

  signIn: (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    Admin.findOne({ where: { username: req.body.username } }).then(function(admin) {
      if (!admin) {
        res.status(200).json({ errors: 'username not registered' });
      } else if (!admin.validPassword(req.body.password)) {
        res.status(200).json({ errors: 'wrong password' });
      } else {
        res.status(200).json({
          token: createToken({
            sessionData: admin.dataValues,
            maxAge: 3600 // 1 hour
          })
        });
      }
    });
  },

  getAll: (req, res) => {
    Admin.findAll()
      .then(admin => {
        res.status(201).send(admin);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  }
};
