import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/db';
import Task from '@/models/Task';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tasks = await Task.find({ userEmail: session.user.email }).sort({ createdAt: -1 });

  return NextResponse.json(tasks);
}

export async function POST(req: NextRequest) {
  await connectDB();

  const session = await getServerSession({ req, ...authOptions });

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { title, done = false } = await req.json();

  const task = await Task.create({
    userEmail: session.user.email,
    title,
    done,
  });

  return NextResponse.json(task, { status: 201 });
}
