const openai = require('openai'); 
openai.apiKey = process.env.OPENAI_API_KEY;

async function generateMentorRecommendations(prompt, alumniProfiles) {
  try {
    // Create an input format with alumni skills and experience for the AI
    const alumniData = alumniProfiles.map(alumni => {
      return `Name: ${alumni.name}, Skills: ${alumni.skills.join(', ')}, Experience: ${alumni.experience}, Workplace: ${alumni.workplace}`;
    }).join('\n');

    const response = await openai.Completion.create({
      engine: 'text-davinci-003',
      prompt: `Based on the following alumni profiles, suggest mentors for the student's request: ${prompt}\nAlumni Profiles:\n${alumniData}`,
      max_tokens: 150,
    });

    const recommendedMentors = response.choices[0].text.trim().split('\n');
    return recommendedMentors.map((mentor) => {
      const [name, skills] = mentor.split(':');
      return { name: name.trim(), skills: skills ? skills.trim() : '' };
    });
  } catch (error) {
    console.error('Error generating mentor recommendations:', error);
    throw error;
  }
}

module.exports = {
  generateMentorRecommendations,
};
