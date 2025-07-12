import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Note from '@/models/Note';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface Params {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params }: Params) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, content } = await req.json();

  const note = await Note.findOneAndUpdate(
    { _id: params.id, userEmail: session.user.email },
    { title, content },
    { new: true }
  );

  if (!note) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

  return NextResponse.json(note);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });
  if (!session?.user?.email)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const deleted = await Note.findOneAndDelete({ _id: params.id, userEmail: session.user.email });

  if (!deleted) return NextResponse.json({ error: 'Note not found' }, { status: 404 });

  return NextResponse.json({ message: 'Note deleted' });
}
