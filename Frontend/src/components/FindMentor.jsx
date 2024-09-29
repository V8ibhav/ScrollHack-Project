import React, { useState } from 'react';
import axios from 'axios';

const FindMentor = () => {
    const [mentorPrompt, setMentorPrompt] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    const handleMentorSearch = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/mentor-search', { prompt: mentorPrompt });
            setAiResponse(response.data.message);
        } catch (error) {
            console.error('Error during mentor search', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="find-mentor">
            <h1>Find a Mentor</h1>
            <textarea
                value={mentorPrompt}
                onChange={(e) => setMentorPrompt(e.target.value)}
                placeholder="Describe the type of mentor you're looking for (e.g., AI expert, 5 years of experience, etc.)"
            />
            <button onClick={handleMentorSearch} disabled={loading}>
                {loading ? 'Searching...' : 'Search Mentor'}
            </button>
            {aiResponse && (
                <div className="ai-response">
                    <h3>AI Recommended Mentor:</h3>
                    <p>{aiResponse}</p>
                </div>
            )}
        </div>
    );
};

export default FindMentor;
