import React, { useState } from 'react';

interface FlashcardProps {
  question: string;
  answer: string;
  direction: 'next' | 'prev';
}

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {

  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <div
    className={`relative w-full  h-full cursor-pointer`}
    onClick={() => setIsFlipped(!isFlipped)}
  >
      <div
        className="relative w-full h-64 text-center transition-transform duration-700 transform-style-preserve-3d"
        style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full flex justify-center items-center bg-gradient-to-r from-blue-400 to-purple-500 dark:from-purple-600 dark:to-pink-600 rounded-md shadow-lg p-4 text-white "
          
        >
          <div className="text-2xl sm:text-4xl font-extrabold break-words line-clamp-3">{question}</div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full flex justify-center items-center bg-gradient-to-r from-pink-500 to-yellow-500 dark:from-yellow-600 dark:to-red-600 rounded-md shadow-lg p-4 text-white backface-hidden transform" style={{ transform: 'rotateY(180deg)' }}>
          <div className="text-2xl sm:text-4xl font-extrabold break-words line-clamp-3">{answer}</div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
