const { join } = require('path');
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { loadSchemaSync } = require('@graphql-tools/load');
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

const schema = loadSchemaSync(join(__dirname, './schemas/schema.graphql'), {
  loaders: [new GraphQLFileLoader()]
});

const app = express();

const users = [
  {
    id: '1',
    username: 'Bohdan',
    age: 19,
    posts: []
  },
  {
    id: '2',
    username: 'Misha',
    age: 24,
    posts: []
  }
];

app.use(cors());

const root = {
  getAllUsers: () => {
    return users;
  },
  getUser: ({ id }) => {
    return users.find(user => user.id === id);
  },
  createUser: ({ input }) => {
    const id = Date.now();
    const user = { id, ...input };

    users.push(user);

    return user;
  }
};

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: root
}));

app.listen(
  4444,
  () => console.log('server is running on port 4444')
);
