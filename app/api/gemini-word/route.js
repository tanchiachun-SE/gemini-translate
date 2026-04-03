import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function POST(request) {
    try {
        const { text, targetLanguage } = await request.json();

        // Input validation
        if (!text || !targetLanguage) {
            return NextResponse.json(
                { error: 'Text and target language are required' },
                { status: 400 }
            );
        }

        // Create the prompt based on target language
        let prompt;
        if (targetLanguage === 'en') {
            prompt = `Translate this text to English: "${text}". Only provide the direct translation without any additional explanation.`;
        } else if (targetLanguage === 'ms') {
            prompt = `Translate this text to Bahasa Melayu: "${text}". Only provide the direct translation without any additional explanation.`;
        } else {
            return NextResponse.json(
                { error: 'Invalid target language. Use "en" for English or "ms" for Bahasa Melayu' },
                { status: 400 }
            );
        }

        // Get the Gemini Pro model
        const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

        // Generate the translation
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translation = response.text();

        // Return the translation
        return NextResponse.json({
            translation,
            originalText: text,
            targetLanguage
        });

    } catch (error) {
        console.error('Translation error:', error);
        return NextResponse.json(
            { error: 'Failed to translate text' },
            { status: 500 }
        );
    }
}