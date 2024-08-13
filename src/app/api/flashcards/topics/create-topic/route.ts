import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';
import { nanoid } from 'nanoid';

interface TopicRequest {
  name: string;
}

export async function POST(req: Request) {
  try {
    const { name }: TopicRequest = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Topic name is required' }, { status: 400 });
    }

    // Generate a unique slug for the topic
    const slug = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nanoid(6)}`;

    // Insert the new topic into the database
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO topics (name, slug) VALUES (?, ?)`,
      [name, slug]
    );

    return NextResponse.json({ message: 'Topic created successfully', id: result.insertId, slug , name});
  } catch (error) {
    console.error('Error creating topic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
