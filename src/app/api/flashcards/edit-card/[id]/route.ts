import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

interface FlashcardUpdateRequest {
  question: string;
  answer: string;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { question, answer }: FlashcardUpdateRequest = await req.json();

    if (!question || !answer) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    await pool.query(
      `UPDATE flashcards SET question = ?, answer = ? WHERE id = ?`,
      [question, answer, id]
    );

    return NextResponse.json({ message: 'Flashcard updated successfully' });
  } catch (error) {
    console.error('Error updating flashcard:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

