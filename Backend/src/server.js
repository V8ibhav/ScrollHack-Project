const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000; // Ensure this matches your frontend API requests

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample function to simulate mentor search
const findMentors = async (prompt) => {
    // Logic to find mentors based on the prompt
    // In a real scenario, you would query a database or some service
    return [
        { id: 'mentor1', name: 'John Doe', expertise: 'Web Development', location: 'New York' },
        { id: 'mentor2', name: 'Jane Smith', expertise: 'Data Science', location: 'San Francisco' },
    ];
};

// Example route for finding mentors
app.post('/api/mentor-search', async (req, res) => {
    const { prompt } = req.body;
    console.log('Received prompt:', prompt); // Debugging log
    const mentors = await findMentors(prompt);
    res.json(mentors);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
