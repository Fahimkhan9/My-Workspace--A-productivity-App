import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Note from '@/models/Note';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const notes = await Note.find({ userId: session.user.id }).sort({ createdAt: -1 });

  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  const note = await Note.create({
    userId: session.user.id,
    title,
    content,
  });

  return NextResponse.json(note, { status: 201 });
}
