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
    me: User
    user(email: String!): User
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

    updateUser(
      firstName: String
      lastName: String
      email: String
      birthday: String
      password: String
      avatar: String
    ): User

    deleteUser: User

    addMood(
      mood: String!
      anxiety: String!
      insomnia: String!
      panicAttacks: String
      symptoms: [String]
      accomplishments: String
      notes: String
    ): Mood

    deleteMood(_id: ID): Mood
  }
`;

module.exports = typeDefs;
