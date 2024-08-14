
import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const [topics] = await pool.query<any[]>(
      `SELECT topics.id, topics.name, topics.slug, 
              JSON_ARRAYAGG(JSON_OBJECT('id', flashcards.id, 'question', flashcards.question, 'answer', flashcards.answer)) AS flashcards 
       FROM topics 
       INNER JOIN flashcards ON topics.id = flashcards.topic_id 
       GROUP BY topics.id`
    );

    return NextResponse.json(topics);
  } catch (error) {
    console.error('Error fetching topics with flashcards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
