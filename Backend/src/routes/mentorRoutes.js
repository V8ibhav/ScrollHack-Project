const express = require('express');
const router = express.Router();
const Alumni = require('../models/alumniModel'); // Assuming you have an Alumni model for storing alumni profiles
const { generateMentorRecommendations } = require('../services/aiService'); // Your AI service for generating recommendations

// Route to handle mentor search
router.post('/findMentor', async (req, res) => {
  const { prompt } = req.body;

  try {
    // Fetch alumni profiles from the database
    const alumniProfiles = await Alumni.find();

    // Generate AI-based recommendations based on the prompt and alumni data
    const recommendedMentors = await generateMentorRecommendations(prompt, alumniProfiles);

    res.json(recommendedMentors);
  } catch (error) {
    console.error('Error fetching mentors:', error);
    res.status(500).json({ message: 'Failed to fetch mentors' });
  }
});

module.exports = router;
