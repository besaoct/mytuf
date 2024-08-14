import { pool } from '@/lib/db';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ResultSetHeader } from 'mysql2/promise';
import { NextRequest, NextResponse } from 'next/server';

interface Flashcard {
    question: string;
    answer: string;
  }
  
interface FlashcardsRequest {
    topicSlug: string;
    flashcards: Flashcard[];
 }  


const genFlashcards = async (prompt: string): Promise<string> => {
  const apiKey = process.env.GEMINI_API_KEY as string;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: { responseMimeType: "application/json" },
    systemInstruction: `
     
      You are highly skilled, expert and professional learning flashcard generator. Each flashcard has an one-liner question and one-liner answer. 

      Rules to follow : 
      
      1. Must generate flash cards based on the topic, description and the number provided. If no number is provided generate at least 4 cards in json format.

      2. If any field is not mentioned or is empty in then you must use data related to programming to fill those information or fields in JSON output.

      3. Each flashcard has question and answer.
      
      4. The JSON format:

      [ 
        {
        "question": "",
        "answer": "",
        },

        //add more based on the number how many flashcards he wants   
      ]

    `,
    
  });

  const result = await model.generateContent(prompt);
  const text = await result.response.text();

  return text;
};

export async function POST(request: NextRequest) {

  const { number_of_flashcards,description, topic_name,  topic_slug } = await request.json();
  
  const jsonData ={
    number_of_flashcards,
    description, 
    topic_name
  }

  if (!jsonData) {
    return NextResponse.json({ result: 'I cannot make flashcard of that topic!' });
  }

  try {
    const resAI = await genFlashcards(JSON.stringify(jsonData));
    const res = JSON.parse(resAI)

    const reqJson = {
        topicSlug: topic_slug,
        flashcards: res
    }
    const { topicSlug, flashcards }: FlashcardsRequest =  reqJson

    if (!topicSlug || !flashcards || flashcards.length === 0) {
        return NextResponse.json({ error: 'Topic slug and at least one flashcard are required' }, { status: 400 });
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
  
      // Insert flashcards
      const insertedFlashcards = [];
      for (const flashcard of flashcards) {
        const { question, answer } = flashcard;
  
        const [result] = await pool.query<ResultSetHeader>(
          `INSERT INTO flashcards (topic_id, question, answer) VALUES (?, ?, ?)`,
          [topicId, question, answer]
        );
  
        insertedFlashcards.push({
          id: result.insertId,
          question,
          answer
        });
      }

    return NextResponse.json({ result: insertedFlashcards });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}