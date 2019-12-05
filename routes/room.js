const express = require('express');
const { check } = require('express-validator');
const multer = require('multer');
const verifyJWT = require('../middleware/jwt');
const validate = require('../middleware/routes-validation');
const controller = require('../controllers/room');
const storage = require('../libs/storage-uploads');

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
    check('id').isInt({ gt: 0 }),
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
  delete: [check('id').isInt()]
};

const uploadImage = multer(storage('img/room/')).single('image');

router.get('/', verifyJWT('Admin'), controller.list);

router.post('/', validate(validator.create), verifyJWT('Admin'), uploadImage, controller.create);

router.put('/:id', validate(validator.update), verifyJWT('Admin'), controller.update);

router.delete('/:id', validate(validator.delete), verifyJWT('Admin'), controller.delete);

router.get('/available', controller.available);

module.exports = router;
