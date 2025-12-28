import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export const config = {
    runtime: 'edge',
};

export default async function handler(req: Request) {
    const { messages } = await req.json();

    const result = streamText({
        model: google('gemini-1.5-flash'),
        messages,
        system: `You are Arrow AI, the AI design assistant for Arrows Design Studio. 
    Your tone is creative, professional, and helpful.
    
    About Arrows Design Studio:
    - Specializes in minimal, meaningful digital experiences.
    - Offers services in UI/UX Design, Web Development, and Branding.
    - Founded by a multi-disciplinary designer.
    
    If asked about pricing, mention our Pro ($29/mo) and Studio ($99/mo) plans.
    If asked about contact, direct them to the contact section at the bottom of the page.
    
    Keep responses concise and visually spaced out.`
    });

    return result.toTextStreamResponse();
}
