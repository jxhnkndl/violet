const { AuthenticationError } = require('apollo-server-express');
const { User, Mood } = require('../models');

const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('moods');
    }
  }
};

module.exports = resolvers;
