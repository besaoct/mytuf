import { NextResponse } from 'next/server';
import { pool } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query<any[]>(
      `SELECT id, name, slug FROM topics`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching topics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
