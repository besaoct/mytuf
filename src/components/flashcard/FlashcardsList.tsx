'use client'

import React, { useState } from 'react';
import Flashcard from './FlashCard';
import FlashcardNavigation from './FlashCardNav';
import { FlashcardTypes } from '@/types';

interface FlashcardListProps {
  flashcards: FlashcardTypes[]
}

const FlashcardList: React.FC<FlashcardListProps> = ({ flashcards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setDirection('next');
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousCard = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center overflow-hidden w-full">
      <Flashcard
        key={currentIndex}
        question={flashcards[currentIndex]?.question}
        answer={flashcards[currentIndex]?.answer}
        direction={direction}
      />
      <FlashcardNavigation
        onNext={nextCard}
        onPrevious={previousCard}
        currentIndex={currentIndex}
        totalCards={flashcards.length}
      />
    </div>
  );
};

export default FlashcardList;
