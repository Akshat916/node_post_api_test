const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

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
  // console.log('Received POST request with data:', data);
  const contactId = data.data.id;
  // console.log('Contact Id ======= ', contactId);
  fetchConversationsAndContacts(contactId);
  res.send('POST request received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to fetch information about ongoing conversations and their contacts
async function fetchConversationsAndContacts(contactId) {
const driftApiKey = 'he22N9v597g4t0J9dftC94y1LjoXRAqF';

  try {
    // Make a GET request to the Drift API's contacts endpoint using the contactId
    const contactResponse = await axios.get(`https://api.drift.com/v1/contacts/${contactId}`, {
      headers: {
        'Authorization': `Bearer ${driftApiKey}`,
      },
    });
    console.log('Contact Information:', contactResponse.data);

    const contactData = contactResponse.data.data.attributes;

    // Create userData object with default values for missing attributes
    const userData = {
      id: contactResponse.data.data.id || null,
      externalId: contactData.externalId || null,
      location: contactData.last_context_location ? JSON.parse(contactData.last_context_location) : null,
      email: contactData.email || null,
    };

    // Log information about the contact
    console.log('Contact Information:', userData);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(`Contact with ID ${contactId} not found. It may have been deleted.`);
    } else {
      console.error(`Error fetching contact with ID ${contactId}:`, error.message);
    }
  }
}

