import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET( req :Request) {
  const url =  new URL(req.url);
  const topicSlug = url.searchParams.get('topicSlug');
  
  try {
    const [topicResult] = await pool.query<any[]>(
      `SELECT id FROM topics WHERE slug = ?`,
      [topicSlug]
    );

    if (topicResult.length < 1) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    const topicId = topicResult[0].id;

    // Get flashcards by topic ID
    const [flashcardsResult] = await pool.query<any[]>(
      `SELECT id, question, answer FROM flashcards WHERE topic_id = ?`,
      [topicId]
    );

    return NextResponse.json(flashcardsResult);
  } catch (error) {
    console.error('Error fetching flashcards:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
