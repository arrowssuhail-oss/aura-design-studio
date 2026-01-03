import express from 'express';
import cors from 'cors';
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import util from 'util';

const execPromise = util.promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.post('/api/sync-github', async (req, res) => {
    try {
        const { content, pageId } = req.body;
        if (!content || !pageId) {
            return res.status(400).json({ error: 'Missing content or pageId' });
        }

        console.log(`Syncing page ${pageId} to GitHub...`);

        // 1. Handle Images (convert base64 to files)
        const uploadDir = path.join(__dirname, 'public', 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const processImage = (base64Str, prefix) => {
            if (base64Str && base64Str.startsWith('data:image')) {
                const matches = base64Str.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
                if (matches && matches.length === 3) {
                    const extension = matches[1];
                    const data = Buffer.from(matches[2], 'base64');
                    const fileName = `${prefix}_${Date.now()}.${extension}`;
                    const filePath = path.join(uploadDir, fileName);
                    fs.writeFileSync(filePath, data);
                    return `/uploads/${fileName}`; // Return the web path
                }
            }
            return base64Str;
        };

        // Process Hero Image
        if (content.heroImage) {
            content.heroImage = processImage(content.heroImage, `page_${pageId}_hero`);
        }

        // Process Gallery
        if (content.gallery && Array.isArray(content.gallery)) {
            content.gallery = content.gallery.map((img, idx) => processImage(img, `page_${pageId}_gallery_${idx}`));
        }

        // 2. Save Updated Content to a JSON file
        const dataDir = path.join(__dirname, 'src', 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        let contentPath;
        if (pageId === 'main_projects') {
            contentPath = path.join(dataDir, 'projects.json');
        } else if (pageId === 'users') {
            contentPath = path.join(dataDir, 'users.json');
        } else {
            contentPath = path.join(dataDir, `content_${pageId}.json`);
        }
        fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));

        // 3. Git Commit and Push
        try {
            await execPromise('git add .');
            await execPromise(`git commit -m "Admin Update: Page ${pageId} content and assets"`);
            await execPromise('git push');
            console.log('Successfully pushed to GitHub');
        } catch (gitError) {
            console.error('Git error (might be nothing to commit):', gitError.message);
            // Don't fail the request if push fails (e.g. no changes)
        }

        res.json({ success: true, updatedContent: content });
    } catch (error) {
        console.error('Error syncing to GitHub:', error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
