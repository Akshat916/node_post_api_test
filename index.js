const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests
app.get('/api', (req, res) => {
  const data = req.query; // Access query parameters if any
  console.log("Received GET request data:", data);
});

// Handle POST requests
app.post('/api/postData', (req, res) => {
  const data = req.body;
  console.log('Received POST request with data:', data);
  res.send('POST request received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
