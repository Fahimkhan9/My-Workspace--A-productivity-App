import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  const { content } = await req.json();

  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  try {
   const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash',
  contents: `Please provide a concise summary of the following text, highlighting the key points:\n\n${content}`,
});

    // response.text contains the generated summary
    return NextResponse.json({ summary: response.text });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return NextResponse.json({ error: 'Failed to summarize' }, { status: 500 });
  }
}
