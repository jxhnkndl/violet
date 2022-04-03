const { AuthenticationError } = require('apollo-server-express');
const { User, Mood } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check to verify user is logged in
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('moods');

        console.log(userData);

        return userData;
      }

      throw new AuthenticationError('User not logged in.');
    },
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
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      // check to verify user is logged in
      if (context.user) {
        const id = context.user._id;

        // update user data
        const user = await User.findOneAndUpdate(
          { id },
          args,
          { new: true }
        );

        return user;
      }

      throw new AuthenticationError('User not logged in.');
    },
    deleteUser: async (parent, args, context) => {
      // check to verify user is logged in
      if (context.user) {
        const id = context.user._id;
        const user = await User.findByIdAndDelete(id);

        console.log(user);

        return user;
      }

      throw new AuthenticationError('User not logged in.');
    }
  },
};

module.exports = resolvers;
