const { verifyToken } = require('../libs/auth');

module.exports = (req, res, next) => {
  verifyToken(req.headers.authorization)
    .then(decodedToken => {
      req.user = decodedToken.data;
      next();
    })
    .catch(err => {
      res.status(401).json({ message: 'Invalid auth token provided.' });
    });
};
