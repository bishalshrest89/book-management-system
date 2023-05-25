// Import dependencies
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { PrismaClient } = require('@prisma/client');

// Create a new instance of PrismaClient
const prisma = new PrismaClient();

// Define the GraphQL schema
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publicationYear: Int!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, publicationYear: Int!): Book!
    updateBook(id: ID!, title: String!, author: String!, publicationYear: Int!): Book!
    deleteBook(id: ID!): Book
  }
`;

// Define the resolvers
const resolvers = {
  Query: {
    books: () => {
      return prisma.book.findMany();
    },
    book: (_, { id }) => {
      return prisma.book.findUnique({ where: { id } });
    },
  },
  Mutation: {
    createBook: (_, { title, author, publicationYear }) => {
      return prisma.book.create({ data: { title, author, publicationYear } });
    },
    updateBook: (_, { id, title, author, publicationYear }) => {
      return prisma.book.update({ where: { id }, data: { title, author, publicationYear } });
    },
    deleteBook: (_, { id }) => {
      return prisma.book.delete({ where: { id } });
    },
  },
};

// Create an instance of ApolloServer
const server = new ApolloServer({ typeDefs, resolvers });

// Create an instance of Express
const app = express();

// Apply the ApolloServer GraphQL middleware to Express
server.applyMiddleware({ app });

// Start the server
app.listen({ port: 4000 }, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});
