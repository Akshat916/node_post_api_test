const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create an array to store received POST data
const postDataCollection = [];

// Parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests to retrieve all stored POST data
app.get('/api/postData', (req, res) => {
  res.json(postDataCollection);
});

// Handle POST requests
app.post('/api/postData', (req, res) => {
  const data = req.body;

  // Store the received data
  postDataCollection.push(data);

  console.log('Received POST request with data:', data);

  // Uncomment the lines below if you want to log the data and fetch information
  // const contactId = data.data.id;
  // fetchConversationsAndContacts(contactId);

  res.send('POST request received successfully!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Function to fetch information about ongoing conversations and their contacts
// async function fetchConversationsAndContacts(contactId) {
//   const driftApiKey = 'he22N9v597g4t0J9dftC94y1LjoXRAqF';
//
//   try {
//     // Make a GET request to the Drift API's contacts endpoint using the contactId
//     const contactResponse = await axios.get(`https://api.drift.com/v1/contacts/${contactId}`, {
//       headers: {
//         'Authorization': `Bearer ${driftApiKey}`,
//       },
//     });
//     console.log('Contact Information:', contactResponse.data);
//
//     const contactData = contactResponse.data.data.attributes;
//
//     // Create userData object with default values for missing attributes
//     const userData = {
//       id: contactResponse.data.data.id || null,
//       externalId: contactData.externalId || null,
//       location: contactData.last_context_location ? JSON.parse(contactData.last_context_location) : null,
//       email: contactData.email || null,
//     };
//
//     // Log information about the contact
//     console.log('Contact Information:', userData);
//   } catch (error) {
//     if (error.response && error.response.status === 404) {
//       console.log(`Contact with ID ${contactId} not found. It may have been deleted.`);
//     } else {
//       console.error(`Error fetching contact with ID ${contactId}:`, error.message);
//     }
//   }
// }
