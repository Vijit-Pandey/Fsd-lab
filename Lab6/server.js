const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Your routes here
app.get('/api/books', (req, res) => {
  // Example response
  res.json([{ title: 'Book 1', author: 'Author 1' }]);
});

app.post('/api/books', (req, res) => {
  // Example response
  res.status(201).json(req.body);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});