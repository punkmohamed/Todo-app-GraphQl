import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { schema } from './schema.js';
import { resolvers } from './resolvers/index.js';
import mongoose from "mongoose"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"


dotenv.config()

mongoose.connect("mongodb://localhost:27017/GraphqlDB").then(() => {
  console.log("connected");

}).catch((err) => {
  console.log(err);

})

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolvers,
  formatError: (err) => {

    return err.message
  }
})

startStandaloneServer(server, {
  listen: { port: 3001 },
  context: ({ req }) => {

    const token = req.headers.authorization
    if (!token) {
      return null
    }
    try {
      const decodedData = jwt.verify(token, process.env.SECRET);
      return decodedData
    } catch (err) {
      return null
    }

  }
}).then(() => {
  console.log("server started successfully");

}).catch((err) => {
  console.log(err);

})