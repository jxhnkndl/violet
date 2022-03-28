const { AuthenticationError } = require('apollo-server-express');
const { User, Mood } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().select('-__v -password').populate('moods');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email address.');
      }

      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Invalid password. Please try again.');
      }

      const token = signToken(user);
      
      return { token, user };
    },
  },
};

module.exports = resolvers;
