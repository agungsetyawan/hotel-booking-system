const { verifyToken } = require('../libs/auth');

module.exports = async (req, res, next) => {
  try {
    const decodedToken = await verifyToken(req.headers.authorization);
    req.user = decodedToken.data;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid auth token provided.' });
  }
};
