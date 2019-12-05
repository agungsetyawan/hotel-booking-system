const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/room');

const router = express.Router();

// validation routes
const validator = {
  create: [
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
  update: [
    check('username')
      .trim()
      .isLength({ min: 5, max: 30 })
      .withMessage('must be at least 5-30 chars long'),
    check('password')
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long')
  ],
  delete: [check('id').exists()]
};

router.post('/', validate(validator.create), verifyJWT('Admin'), controller.create);

router.put('/', validate(validator.update), verifyJWT('Admin'), controller.update);

router.get('/', controller.list);

router.delete('/', validate(validator.delete), verifyJWT('Admin'), controller.delete);

module.exports = router;
