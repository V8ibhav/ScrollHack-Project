import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios'; // Import Axios
import mongoose from 'mongoose';
import Alumni from './models/alumni.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.post('/api/mentor-search', async (req, res) => {
    const { prompt } = req.body;

    try {
        const alumniData = await Alumni.find();

        const alumniProfiles = alumniData.map(alumni => `
            Name: ${alumni.name}
            Skills: ${alumni.skills.join(', ')}
            Workplace: ${alumni.workplace}
            Experience: ${alumni.experience} years
            Description: ${alumni.description}
        `).join('\n\n');

        const finalPrompt = `
            Based on the following student request, suggest the best alumni mentor from the list below:
            Request: ${prompt}

            Alumni Profiles:
            ${alumniProfiles}
        `;

        // Send a request to the Gemini API
        const response = await axios.post('https://api.gemini.ai/v1/chat/completions', {
            prompt: finalPrompt,
            model: 'gpt-4', // Change the model name if needed
            max_tokens: 200,
            temperature: 0.7,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, // Use your actual API key
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].text.trim();
        res.json({ message: aiResponse });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching alumni data or with AI search.' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
