
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';
import { nanoid } from 'nanoid';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name }: { name: string } = await req.json();

  if (!name || name.trim() === '') {
    return NextResponse.json({ error: 'Topic name is required' }, { status: 400 });
  }

   // Generate a unique slug for the topic
  const slug = `${name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${nanoid(6)}`;

  try {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE topics SET name = ?, slug = ? WHERE id = ?`,
      [name, slug, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Topic updated successfully', id, slug ,name});
  } catch (error) {
    console.error('Error updating topic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
