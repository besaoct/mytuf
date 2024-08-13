import React from 'react';
import FlashcardList from '@/components/flashcard/FlashcardsList';
import { pool } from '@/lib/db';
import { FlashcardTypes } from '@/types';
import { RowDataPacket } from 'mysql2/promise';

type props = {
    params:{
        topic:string
    }
}

const FlashcardsPerTopicPage = async ({params : {topic}}:props) => {

    const [rows] = await pool.query<RowDataPacket[]>(
        `
        SELECT f.id, f.question, f.answer 
        FROM flashcards f
        INNER JOIN topics t ON f.topic_id = t.id
        WHERE t.slug = ?
        `,
        [topic]
      );
    
      // Map the rows to the expected FlashcardType
      const flashcards = rows.map((row) => ({
        id: row.id,
        question: row.question,
        answer: row.answer,
      })) as FlashcardTypes[];
  
  return (
    <div >
      <FlashcardList flashcards={flashcards} />
    </div>
  );
};

export default FlashcardsPerTopicPage;
