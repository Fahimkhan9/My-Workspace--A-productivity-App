import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Task from '@/models/Task';

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
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { title, done } = await req.json();

  const task = await Task.findOneAndUpdate(
    { _id: params.id, userId: session.user.id },
    { title, done },
    { new: true }
  );

  if (!task)
    return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });

  return NextResponse.json(task);
}

export async function DELETE(req: NextRequest, { params }: Params) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });
  if (!session?.user?.id)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const deleted = await Task.findOneAndDelete({
    _id: params.id,
    userId: session.user.id,
  });

  if (!deleted)
    return NextResponse.json({ error: 'Task not found or unauthorized' }, { status: 404 });

  return NextResponse.json({ message: 'Task deleted' });
}
