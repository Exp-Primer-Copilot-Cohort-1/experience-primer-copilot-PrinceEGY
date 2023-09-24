// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Parse JSON (application/json content-type)
app.use(bodyParser.json());

// Parse URL-encoded (application/x-www-form-urlencoded content-type)
app.use(bodyParser.urlencoded({ extended: true }));

// Add CORS headers
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

// List of comments
const comments = [];

// Get all comments
app.get('/comments', (req, res) => {
  res.send(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const comment = comments.find((comment) => comment.id === parseInt(req.params.id));
  if (comment) {
    res.send(comment);
  } else {
    res.status(404).send();
  }
});

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comment.id = comments.length + 1;
  comments.push(comment);
  res.send(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const index = comments.findIndex((comment) => comment.id === parseInt(req.params.id));
  if (index >= 0) {
    comments.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const index = comments.findIndex((comment) => comment.id === parseInt(req.params.id));
  if (index >= 0) {
    comments[index] = req.body;
    comments[index].id = parseInt(req.params.id);
    res.send(comments[index]);
  } else {
    res.status(404).send();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});