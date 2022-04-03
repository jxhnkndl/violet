const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    birthday: String
    avatar: String
    moods: [Mood]
    moodCount: Int
  }

  type Mood {
    _id: ID
    date: String
    mood: Int
    anxiety: Int
    insomnia: Int
    panicAttacks: Int
    symptoms: [String]
    accomplishments: String
    notes: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      birthday: String!
      password: String!
    ): Auth
  }
`;

module.exports = typeDefs;