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

const uploadImage = multer(storage('img/room/')).single('image');

router.post('/', validate(validator.create), verifyJWT('Admin'), uploadImage, controller.create);

router.put('/', validate(validator.update), verifyJWT('Admin'), controller.update);

router.get('/', controller.list);

router.delete('/', validate(validator.delete), verifyJWT('Admin'), controller.delete);

module.exports = router;
