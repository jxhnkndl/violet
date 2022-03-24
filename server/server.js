const express = require('express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');

const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// init apollo server
const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`GraphQL Playground at http://localhost:${PORT}${server.graphqlPath}`);
}

// start apollo server
startServer();

// req body parsing middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// start server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API running on port ${PORT} 🌍`);
  });
});