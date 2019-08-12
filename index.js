

const express = require('express'); // Imports the Express package...

const server = express(); // This creates a server...

server.get('/', (req, res) => { // This is a route handler...
  res.send('Hello World' + ' ' + 'Give me a break!');
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

server.listen(8000, () => console.log('API running on port 8000'));