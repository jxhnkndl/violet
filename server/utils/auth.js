const jwt = require('jsonwebtoken');

// make environmental variables readable
require('dotenv').config();

// token settings
const expiration = '2h';

module.exports = {
  // sign new auth tokens on user login or creation of new user
  signToken: function ({ _id, email }) {
    const payload = { _id, email };

    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: expiration });
  },

  // check for and verify auth tokens sent from client
  authMiddleware: function ({ req }) {
    // capture token from authorization header
    let token = req.headers.authorization;

    // extract token value from header string
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    // return unaltered request object if there is no token
    if (!token) {
      return req;
    }

    // verify token signature and attach user id and email to req object
    try {
      const { data } = jwt.verify(token, process.env.JWT_SECRET, { maxAge: expiration });
      req.user = data;
    } catch (err) {
      console.error(err);
      console.log('Invalid token.');
    }

    // return the update req object
    return req;
  },
};
