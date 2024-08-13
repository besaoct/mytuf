import { pool } from "@/lib/db";
import { ResultSetHeader } from "mysql2/promise";
import { NextResponse } from "next/server";

interface FlashcardRequest {
  topicSlug:string;
  question: string;
  answer: string;
}



export async function POST(req: Request) {
  try {
    const { topicSlug, question, answer }: FlashcardRequest = await req.json();
    
    if (!topicSlug || !question || !answer) {
      return NextResponse.json({ error: 'Topic slug, question, and answer are required' }, { status: 400 });
    }

    // Get topic ID from slug
    const [topicResult] = await pool.query<any[]>(
      `SELECT id FROM topics WHERE slug = ?`,
      [topicSlug]
    );

    if (topicResult.length === 0) {
      return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
    }

    const topicId = topicResult[0].id;

    // Insert new flashcard
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO flashcards (topic_id, question, answer) VALUES (?, ?, ?)`,
      [topicId, question, answer]
    );

    // Respond with the full flashcard data
    return NextResponse.json({
      id: result.insertId,
      question,
      answer,
      topicSlug,
    });
  } catch (error) {
    console.error('Error creating flashcard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
