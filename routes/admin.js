const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/admin');

const router = express.Router();

// validation routes
const validator = {
  signUp: [
    check('name')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long'),
    check('username')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('must be at least 5-30 chars long'),
    check('password')
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long')
  ],
  signIn: [
    check('username')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('must be at least 5-30 chars long'),
    check('password')
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long')
  ]
};

router.post('/signup', validate(validator.signUp), controller.signUp);

router.post('/signin', validate(validator.signIn), controller.signIn);

router.get('/', verifyJWT('Admin'), controller.getAll);

router.delete('/', verifyJWT('Admin'), controller.delete);

router.get('/me', verifyJWT('Admin'), controller.me);

module.exports = router;
