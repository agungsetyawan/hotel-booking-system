const express = require('express');
const { check } = require('express-validator');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/booking');

const router = express.Router();

// validation routes
const validator = {
  create: [
    check('startDate')
      .toDate()
      .isISO8601(),
    check('endDate')
      .toDate()
      .isISO8601(),
    check('status')
      .isIn(['booking', 'cancel'])
      .withMessage('value must be booking or cancel'),
    check('numberOfRoom').isInt({ gt: 0 }),
    check('roomId').isInt({ gt: 0 }),
    check('customerId').isInt({ gt: 0 })
  ],
  update: [
    check('id').isInt({ gt: 0 }),
    check('startDate')
      .toDate()
      .isISO8601(),
    check('endDate')
      .toDate()
      .isISO8601(),
    check('status')
      .isIn(['booking', 'cancel'])
      .withMessage('value must be booking or cancel'),
    check('numberOfRoom').isInt({ gt: 0 }),
    check('roomId').isInt({ gt: 0 }),
    check('customerId').isInt({ gt: 0 })
  ],
  delete: [check('id').isInt()],
  cancel: [check('id').isInt()]
};

router.get('/', verifyJWT('Admin'), controller.list);

router.post('/', validate(validator.create), verifyJWT('Customer'), controller.create);

router.put('/:id', validate(validator.update), verifyJWT(['Customer', 'Admin']), controller.update);

router.delete('/:id', validate(validator.delete), verifyJWT('Admin'), controller.delete);

router.post('/cancel/:id', validate(validator.cancel), verifyJWT('Customer'), controller.cancel);

router.get('/me', verifyJWT('Customer'), controller.me);

module.exports = router;
