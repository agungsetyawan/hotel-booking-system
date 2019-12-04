const express = require('express');
const { check, validationResult } = require('express-validator');
const { createJWToken } = require('../libs/auth');
const verifyJWT = require('../middleware');

const router = express.Router();

const { Admin } = require('../models');

router.post(
  '/',
  [
    // name must be an string
    check('name')
      .isString()
      .isLength({ min: 5 }),
    // username must be an string
    check('username')
      .isString()
      .isLength({ min: 5 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ],
  function(req, res, next) {
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
  }
);

router.get('/', verifyJWT, function(req, res, next) {
  Admin.findAll()
    .then(admin => {
      res.status(201).send(admin);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

router.post(
  '/login',
  [
    // username must be an string
    check('username')
      .isString()
      .isLength({ min: 5 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ],
  function(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    }

    Admin.findOne({ where: { username: req.body.username } }).then(function(admin) {
      if (!admin) {
        res.status(200).json({ errors: 'username not regitered' });
      } else if (!admin.validPassword(req.body.password)) {
        res.status(200).json({ errors: 'wrong password' });
      } else {
        res.status(200).json({
          token: createJWToken({
            sessionData: admin.dataValues,
            maxAge: 3600 // 1 hour
          })
        });
      }
    });
  }
);

module.exports = router;
