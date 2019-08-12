const express = require('express');

const users = require('./data/db.js');

const server = express();

server.use(express.json());

// server.get('/', (req, res) => {
//   res.status(202).send('Hello World');
// });

// GET /hubs
server.get('/api/users', (req, res) => { // This is a route handler...
  // res.send('Hello World' + ' ' + 'Give me a break!');
  // Hubs.find() returns a promise. 
  users.find() // Accesses the hubs data from the database...
    .then(users => {
      console.log('Users', users);
      // .json will covert the data passed to json...
      // Also tells the client we're sending json through an HTTP header
      res.status(200).json(users);
  }).catch(error => {
    // 500 code sent if there is a message sending the data back...
    res.status(500).json({ 
      message: 'error getting the list of users' })
  })
});

server.get('/hobbits', (req, res) => {
  const hobbits = [
    {
      id: 1,
      name: 'Samwise Gamgee',
    },
    {
      id: 2,
      name: 'Frodo Baggins',
    },
  ];

  res.status(200).json(hobbits);
});

// POST /
server.post('/api/users', (req, res) => {
  const newUser = req.body; // Object sent from front end aka client. Postman is used for testing as the client. 
  console.log('new user', newUser);
  // Can add validating here. 
  users.add(newUser)
    .then(users => {
      if(user.name && user.bio) {
              console.log('User Id', users.bio)

        res.status(201).json(users);
      } else {
        console.log('else')
        res.status(404).json({
          message: 'Invalid user info'
        });
      }

      // res.status(201).json(users);
  })
  .catch(error => {
    res.status(500).json({
      error: error,
      message: 'Idiot, you failed to create new user'
    });
  });
});

// DELETE /hubs/:id
server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  // const id = req.params.id This line does the same as the line above it. 
  users.remove(id)
    .then(users => {
      // Send error if the id does not exist.
      if(users) {
        res.json(users);
      } else {
        res.status(404).json({
          message: 'invalid hub id'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error,
        message: 'failed to destroy hub'
      });
    });
});

server.listen(8000, () => console.log('API running on port 8000'));