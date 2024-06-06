// Create web server

// Import express module
const express = require('express');

// Import body parser module
const bodyParser = require('body-parser');

// Import comments module
const comments = require('./comments');

// Create a new express app
const app = express();

// Use the body parser middleware
app.use(bodyParser.json());

// Set the port to 3000
const port = 3000;

// Create a new comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.addComment(comment);
  res.send('Comment added');
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments.getAllComments());
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = comments.getCommentById(id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).send('Comment not found');
  }
});

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
  const id = req.params.id;
  comments.deleteComment(id);
  res.send('Comment deleted');
});

// Update a comment by id
app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  comments.updateComment(id, comment);
  res.send('Comment updated');
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});