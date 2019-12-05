const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/booking');

const router = express.Router();

// validation routes
const validator = {
  create: [
    check('type')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('must be at least 5-50 chars long'),
    check('description')
      .trim()
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long'),
    check('quantity')
      .isInt({ gt: 0 })
      .withMessage('must be an integer greater than equals 1'),
    check('price')
      .isInt({ gt: -1 })
      .withMessage('must be an integer greater than equals 0')
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
  delete: [check('id').isInt()],
  cancel: [check('id').isInt()]
};

router.post('/', verifyJWT('Customer'), controller.create);

router.post('/cancel/:id', validate(validator.cancel), verifyJWT('Customer'), controller.cancel);

router.put('/:id', verifyJWT(['Customer', 'Admin']), controller.update);

router.get('/', verifyJWT(['Customer', 'Admin']), controller.list);

router.delete('/:id', verifyJWT('Admin'), controller.delete);

module.exports = router;
