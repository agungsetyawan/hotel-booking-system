const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const controller = require('../controllers/admin');

const router = express.Router();

router.post(
  '/signup',
  [
    // name must be an string
    check('name').isLength({ min: 5 }),
    // username must be an string
    check('username').isLength({ min: 5 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ],
  controller.signUp
);

router.post(
  '/signin',
  [
    // username must be an string
    check('username').isLength({ min: 5 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ],
  controller.signIn
);

router.get('/', verifyJWT, controller.getAll);

module.exports = router;
