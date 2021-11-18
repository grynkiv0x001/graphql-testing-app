const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

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
