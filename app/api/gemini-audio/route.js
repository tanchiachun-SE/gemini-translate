import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFile } from 'node:fs/promises';
import { spawn } from 'child_process';
import { join } from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio');

    if (!audioFile) {
      return NextResponse.json({ error: 'No audio file provided' }, { status: 400 });
    }

    // Convert to WAV using ffmpeg
    const tempPath = join(process.cwd(), 'public/temp');
    const inputPath = join(tempPath, audioFile.name);
    const outputPath = join(tempPath, `converted-${Date.now()}.wav`);

    await writeFile(inputPath, Buffer.from(await audioFile.arrayBuffer()));

    await new Promise((resolve, reject) => {
      const ffmpeg = spawn('C:\\ffmpeg\\bin\\ffmpeg.exe', [
        '-i', inputPath,
        '-acodec', 'pcm_s16le',
        '-ar', '16000',
        '-ac', '1',
        outputPath
      ]);

      ffmpeg.on('close', resolve);
      ffmpeg.on('error', reject);
    });

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-3-flash-preview' });

    // Transcribe audio
    const audioData = await readFile(outputPath);
    const result = await model.generateContent([
      'Transcribe this audio file:',
      {
        inlineData: {
          data: audioData.toString('base64'),
          mimeType: 'audio/wav'
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
      { error: 'Failed to process audio' },
      { status: 500 }
    );
  }
}

async function readFile(path) {
  const fs = await import('node:fs/promises');
  return fs.readFile(path);
}