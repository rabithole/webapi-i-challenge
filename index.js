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
      // console.log('Users', users);
      // .json will covert the data passed to json...
      // Also tells the client we're sending json through an HTTP header
      res.status(200).json(users);
  }).catch(error => {
    // 500 code sent if there is a message sending the data back...
    res.status(500).json({ 
      message: 'error getting the list of users' })
  })
});

server.get('/api/users/:id', (req, res) => {
  Users.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist.' });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ errorMessage: 'The user information could not be retrieved.' });
    });
});

// POST /
server.post('/api/users', (req, res) => {
  const { name, bio } = req.body; // Object sent from front end aka client. Postman is used for testing as the client. 
  // console.log('new user', newUser);
  // Can add validating here. 
  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    users.insert(req.body)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(() => {
        res.status(500).json({
          errorMessage:
            'There was an error while saving the user to the database',
        });
      });
  }
});

// PUT Operaion...

server.put('/api/users/:id', (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    users.update(req.params.id, req.body)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res
            .status(404)
            .json({
              message: 'The user with the specified ID does not exist.',
            });
        }
      })
      .catch(() => {
        res.status(500).json({
          errorMessage: 'The user information could not be modified.',
        });
      });
  }
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