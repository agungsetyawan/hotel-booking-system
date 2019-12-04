const { verifyJWTToken } = require('./libs/auth');

module.exports = function verifyJWT(req, res, next) {
  // const token = req.method === 'POST' ? req.body.token : req.query.token;
  // console.log('token', req.headers.authorization);

  verifyJWTToken(req.headers.authorization)
    .then(decodedToken => {
      req.user = decodedToken.data;
      next();
    })
    .catch(err => {
      res.status(400).json({ message: 'Invalid auth token provided.' });
    });
};
