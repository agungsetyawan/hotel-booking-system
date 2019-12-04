const jwt = require('jsonwebtoken');
const _ = require('lodash');

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET || '5ecr3t', (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }
      resolve(decodedToken);
    });
  });
}

function createJWToken(details) {
  if (typeof details !== 'object') {
    details = {};
  }

  if (!details.maxAge || typeof details.maxAge !== 'number') {
    details.maxAge = 3600;
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

  const token = jwt.sign(
    {
      data: details.sessionData
    },
    process.env.JWT_SECRET || '5ecr3t',
    {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    }
  );

  return token;
}

module.exports = {
  verifyJWTToken,
  createJWToken
};
