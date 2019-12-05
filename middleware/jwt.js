const { verifyToken } = require('../libs/auth');

module.exports = (roles = []) => {
  // roles param can be a single role string (e.g. Role.Customer or 'Customer')
  // or an array of roles (e.g. [Role.Admin, Role.Customer] or ['Admin', 'Customer'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return async (req, res, next) => {
    let token;
    try {
      token = req.header('Authorization').replace('Bearer ', '');
      const decodedToken = await verifyToken(token);
      req.user = decodedToken.data;
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: 'Unauthorized' });
      }
      // authentication and authorization successful
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
    }
  };
};
