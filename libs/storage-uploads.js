const fs = require('fs');
const path = require('path');
const multer = require('multer');
const crypto = require('crypto');

module.exports = destination => {
  const dir = path.join(__dirname, `../public/uploads/${destination}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      // randomBytes function will generate a random name
      const customFileName = crypto.randomBytes(18).toString('hex');
      // get file extension from original file name
      const fileExtension = path.extname(file.originalname).split('.')[1];
      const fileName = `${req.body.name}-${customFileName}.${fileExtension}`;
      cb(null, fileName.replace(/\s+/g, '-').toLowerCase());
    }
  });
};
