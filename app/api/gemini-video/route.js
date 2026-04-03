import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFile } from 'node:fs/promises';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video');

    if (!videoFile) {
      return NextResponse.json({ error: 'No video file provided' }, { status: 400 });
    }

0.
    const tempPath = join(process.cwd(), 'public/temp');
    const inputPath = join(tempPath, videoFile.name);

    await writeFile(inputPath, Buffer.from(await videoFile.arrayBuffer()));

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // Transcribe audio
    const videoData = await readFile(inputPath);
    const result = await model.generateContent([
      'Transcribe this video file:',
      {
        inlineData: {
          data: videoData.toString('base64'),
          mimeType: 'audio/mp4'
        }
      }
    ]);

    const transcript = result.response.text();

    // Translate transcript to English
    const translationResult = await model.generateContent([
      'Translate the following text to English and Bahasa Melayu:',
      transcript
    ]);

    const translation = translationResult.response.text();

    // Return both the original transcript and the translation
    return NextResponse.json({
      transcript: transcript,
      translation: translation
    });

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to process video' },
      { status: 500 }
    );
  }
}

async function readFile(path) {
  const fs = await import('node:fs/promises');
  return fs.readFile(path);
}