
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';

export async function DELETE(req: Request,{ params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // First, delete all flashcards related to the topic
    await pool.query<ResultSetHeader>(`DELETE FROM flashcards WHERE topic_id = ?`, [id]);

    // Then, delete the topic itself
    const [result] = await pool.query<ResultSetHeader>(`DELETE FROM topics WHERE id = ?`, [id]);

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Topic deleted successfully' });
  } catch (error) {
    console.error('Error deleting topic:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
