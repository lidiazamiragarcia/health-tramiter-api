const jwtLib = require('jsonwebtoken');
const { jwt } = require('../config/env');

// signToken(payload, expiresInSeconds?)
// returns signed JWT string. If expiresInSeconds provided uses it, otherwise uses config jwt.expiresIn
exports.signToken = (payload, expiresInSeconds) => {
  const expiresIn = expiresInSeconds || jwt.expiresIn;
  // jsonwebtoken accepts seconds as number
  return jwtLib.sign(payload, jwt.secret, { algorithm: 'HS256', expiresIn });
};

// verifyToken(token) => payload or null
exports.verifyToken = (token) => {
  if (!token) return null;
  try {
    const payload = jwtLib.verify(token, jwt.secret, { algorithms: ['HS256'] });
    return payload;
  } catch (err) {
    return null;
  }
};
