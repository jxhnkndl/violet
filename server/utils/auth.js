const jwt = require('jsonwebtoken');

// make environmental variables readable
require('dotenv').config();

// token settings
const expiresIn = '2h';
const secret = process.env.JWT_SECRET;

module.exports = {
  // sign new auth tokens on user login or creation of new user
  signToken: function ({ _id, email }) {
    const payload = { _id, email };

    return jwt.sign({ data: payload }, secret, { expiresIn });
  },

  // check for and verify auth tokens sent from client
  authMiddleware: function ({ req }) {
    // capture token from authorization header
    let token = req.headers.authorization;

    // extract token value from header string
    if (token) {
      token = token.split(' ').pop().trim();
    }

    // return unaltered request object if there is no token
    if (!token) {
      return req;
    }

    // verify token signature and attach user id and email to req object
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiresIn });
      req.user = data;
    } catch (err) {
      console.error(err);
      console.log('Invalid token.');
    }
  },
};
