const typeDefs = require("./schema");
const resolvers = require("./resolvers")
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
// Construct a schema, using GraphQL schema language
// Provide resolver functions for your schema fields
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(express.static("public"));
server.start().then((res) => {
  server.applyMiddleware({ app });
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at
http://localhost:4000${server.graphqlPath}`)
  );
});
