import mongoose from 'mongoose';

const AlumniSchema = new mongoose.Schema({
    name: { type: String, required: true },
    skills: [String],      
    workplace: String,      
    experience: Number,     
    description: String,    
});

const Alumni = mongoose.model('Alumni', AlumniSchema);


export default Alumni;
