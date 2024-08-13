import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
      const { id } = params;
  
      await pool.query(
        `DELETE FROM flashcards WHERE id = ?`,
        [id]
      );
  
      return NextResponse.json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
      console.error('Error deleting flashcard:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }