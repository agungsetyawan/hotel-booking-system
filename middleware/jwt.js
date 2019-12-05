const { verifyToken } = require('../libs/auth');

module.exports = async (req, res, next) => {
  try {
    const decodedToken = await verifyToken(req.headers.authorization);
    req.user = decodedToken.data;
    next();
  } catch (error) {
    res.status(401).json({
      errors: [
        {
          value: req.headers.authorization,
          msg: 'Invalid auth token provided.',
          param: 'authorization',
          location: 'headers'
        }
      ]
    });
  }
};
