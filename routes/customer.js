const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/customer');

const router = express.Router();

router.post(
  '/signup',
  validate([
    // name must be an string
    check('name').isLength({ min: 5 }),
    // email must be an email type
    check('email').isEmail(),
    // telp must be an numeric and 9-13 chars long
    check('telp')
      .optional()
      .isNumeric()
      .isLength({ min: 9, max: 13 }),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 }),
    // email must be an email type
    check('gender')
      .optional()
      .isIn(['male', 'female']),
    // email must be an email type
    check('dob')
      .optional()
      .isString()
  ]),
  controller.signUp
);

router.post(
  '/signin',
  validate([
    // username must be an string
    check('email').isEmail(),
    // password must be at least 5 chars long
    check('password').isLength({ min: 5 })
  ]),
  controller.signIn
);

router.get('/', verifyJWT, controller.getAll);

module.exports = router;
