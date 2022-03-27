const jwt = require('jsonwebtoken');

module.exports = {
  signToken: function ({ _id, email }) {
    const payload = { _id, email };

    return jwt.sign({ data: payload }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });
  },
};
