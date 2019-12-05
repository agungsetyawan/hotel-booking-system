const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/customer');

const router = express.Router();

// validation routes
const validator = {
  signUp: [
    check('name')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long'),
    check('email')
      .isEmail()
      .withMessage('email not valid'),
    check('telp')
      .optional()
      .isNumeric()
      .withMessage('must be numeric')
      .isLength({ min: 9, max: 13 })
      .withMessage('must be at least 9-13 digit'),
    check('password')
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long'),
    check('gender')
      .optional()
      .isIn(['male', 'female'])
      .withMessage('value must be male or female'),
    check('dob')
      .optional()
      .toDate()
      .isISO8601()
  ],
  signIn: [
    check('email')
      .isEmail()
      .withMessage('email not valid'),
    check('password')
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long')
  ]
};

router.post('/signup', validate(validator.signUp), controller.signUp);

router.post('/signin', validate(validator.signIn), controller.signIn);

router.get('/', verifyJWT('Admin'), controller.getAll);

router.get('/me', verifyJWT('Customer'), controller.me);

module.exports = router;
