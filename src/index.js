import { ApolloServer } from '@apollo/server';
import { readFileSync } from 'fs';
import { startStandaloneServer } from '@apollo/server/standalone';

// =============== Task1 uchun resolvers =============== 
// import resolvers from './tasks/task1.js';
// const typeDefs = readFileSync('./src/schemas/task1_schema.gql', 'utf8');


// =============== Task2 uchun resolvers =============== 
// import resolvers from './tasks/task2.js';
// const typeDefs = readFileSync('./src/schemas/task2_schema.gql', 'utf8');


// =============== Task3 uchun resolvers =============== 
import resolvers from './tasks/task3.js';
const typeDefs = readFileSync('./src/schemas/task3_schema.gql', 'utf8');


const server = new ApolloServer({
  typeDefs,
  resolvers
});

startStandaloneServer(server, { listen: { port: 8080 } })
  .then(({ url }) => console.log(url));