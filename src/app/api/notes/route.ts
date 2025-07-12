import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Note from '@/models/Note';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const notes = await Note.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, content } = await req.json();

  const note = await Note.create({
    userEmail: session.user.email,
    title,
    content,
  });

  return NextResponse.json(note, { status: 201 });
}
