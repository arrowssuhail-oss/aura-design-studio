import express from 'express';
import cors from 'cors';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        const result = streamText({
            model: google('gemini-1.5-flash'),
            messages: messages.map(m => ({ role: m.role, content: m.content })),
            system: `You are Aura, the AI design assistant for Arrows Design Studio. 
    Your tone is creative, professional, and helpful.
    
    About Arrows Design Studio:
    - Specializes in minimal, meaningful digital experiences.
    - Offers services in UI/UX Design, Web Development, and Branding.
    - Founded by a multi-disciplinary designer.
    
    If asked about pricing, mention our Pro ($29/mo) and Studio ($99/mo) plans.
    If asked about contact, direct them to the contact section at the bottom of the page.
    
    Keep responses concise and visually spaced out.`
        });

        result.pipeDataStreamToResponse(res);
    } catch (error) {
        console.error('Error in chat endpoint:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
