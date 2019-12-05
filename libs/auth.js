const jwt = require('jsonwebtoken');
const _ = require('lodash');
const atob = require('atob');

module.exports = {
  verifyToken: token => {
    return new Promise((resolve, reject) => {
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
        if (
          typeof val !== 'function' &&
          key !== 'password' &&
          key !== 'createdAt' &&
          key !== 'updatedAt'
        ) {
          memo[key] = val;
        }
        return memo;
      },
      {}
    );
    if (details.sessionData.username) details.sessionData.role = 'Admin';
    else details.sessionData.role = 'Customer';

    return jwt.sign({ data: details.sessionData }, process.env.JWT_SECRET || '5ecr3t', {
      expiresIn: details.maxAge,
      algorithm: 'HS256'
    });
  },

  parseToken: token => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function(c) {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
};
