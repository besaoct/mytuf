'use client'

import React, { useState } from 'react';
// import './style.css';

interface FlashcardProps {
  question: string;
  answer: string;
  direction: 'next' | 'prev';
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
    className={`relative w-full  h-full cursor-pointer perspective-1000`}
    onClick={() => setIsFlipped(!isFlipped)}
  >
      <div
        className="relative w-full h-96  text-center transition-transform duration-700 transform-style-preserve-3d justify-center items-center flex"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 dark:from-purple-600 dark:to-pink-600 rounded-md shadow-lg text-white backface-hidden p-8"
            
        >
          <div className="text-xl sm:text-3xl font-extrabold break-words line-clamp-6 max-w-lg">{question}</div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full flex justify-center items-center bg-gradient-to-r from-pink-500 to-yellow-500 dark:from-yellow-600 dark:to-red-600 rounded-md shadow-lg p-8 text-white backface-hidden" style={{ transform: 'rotateY(180deg)' }}>
          <div className="text-xl sm:text-3xl font-extrabold break-words line-clamp-6 max-w-lg">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
