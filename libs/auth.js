const jwt = require('jsonwebtoken');
const _ = require('lodash');

module.exports = {
  verifyToken: token => {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-destructuring
      token = token.split(' ')[1]; // Bearer <token>

      jwt.verify(token, process.env.JWT_SECRET || '5ecr3t', (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err);
        }
        resolve(decodedToken);
      });
    });
  },

  createToken: details => {
    if (typeof details !== 'object') {
      details = {};
    }
    if (!details.maxAge || typeof details.maxAge !== 'number') {
      details.maxAge = 3600; // 1 hour expired
    }
    details.sessionData = _.reduce(
      details.sessionData || {},
      (memo, val, key) => {
        if (typeof val !== 'function' && key !== 'password') {
          memo[key] = val;
        }
        return memo;
      },
      {}
    );

    return jwt.sign({ data: details.sessionData }, process.env.JWT_SECRET || '5ecr3t', {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    });
  }
};
