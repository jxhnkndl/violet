const { AuthenticationError } = require('apollo-server-express');
const { User, Mood } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      // check to verify user is logged in
      if (context.user) {
        // find user in database
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('moods');

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
      // find user by email address
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid email address.');
      }

      // validate user's password
      const validPassword = await user.isValidPassword(password);

      if (!validPassword) {
        throw new AuthenticationError('Invalid password. Please try again.');
      }

      // sign new auth token
      const token = signToken(user);

      return { token, user };
    },

    addUser: async (parent, args) => {
      // create new user and sign auth token
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      // check that user is logged in
      if (context.user) {
        // capture user's id
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
      // check that user is logged in
      if (context.user) {
        // capture user's id
        const id = context.user._id;

        // delete user
        const user = await User.findByIdAndDelete(id);

        return user;
      }

      throw new AuthenticationError('User not logged in.');
    },

    addMood: async (parent, args, context) => {
      // check to verify user is logged in
      if (context.user) {
        // capture user's id
        const id = context.user._id;

        // create mood document in database
        const mood = await Mood.create(args);

        // find user and push mood into user's moods array
        await User.findByIdAndUpdate(
          { _id: id },
          { $push: { moods: mood._id } },
          { new: true, runValidators: true }
        );

        return mood;
      }

      throw new AuthenticationError('User not logged in.');
    },

    deleteMood: async (parent, { _id }, context) => {
      // check to verify user is logged in
      if (context.user) {
        const mood = await Mood.findByIdAndDelete(_id);

        return mood;
      }

      throw new AuthenticationError('User not logged in.');
    }
  },
};

module.exports = resolvers;
