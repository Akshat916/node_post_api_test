const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests
app.get('/api', (req, res) => {
  const data = req.query; // Access query parameters
  console.log("Received GET request data:", data);
  res.json(data); // Return the query parameters in JSON format
});

// Handle POST requests
app.post('/api/postData', (req, res) => {
  const data = req.body;
  console.log('Received POST request with data:', data);
  const diff = data.data.data.diff
  console.log("================", diff);
  res.send('POST request received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
