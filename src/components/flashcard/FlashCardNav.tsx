import React from 'react';

interface FlashcardNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  currentIndex: number;
  totalCards: number;
}

const FlashcardNavigation: React.FC<FlashcardNavigationProps> = ({ onNext, onPrevious, currentIndex, totalCards }) => {
  return (
    <div className="flex justify-between mt-4 items-center gap-4">
      <button
        onClick={onPrevious}
        className="px-4 py-2 bg-neutral-300 text-neutral-800 rounded-md disabled:opacity-50"
        disabled={currentIndex === 0}
      >
        Previous
      </button>
      <span className="text-neutral-700 dark:text-neutral-300">
        {currentIndex + 1} / {totalCards}
      </span>
      <button
        onClick={onNext}
        className="px-4 py-2 bg-neutral-300 text-neutral-800 rounded-md disabled:opacity-50"
        disabled={currentIndex === totalCards - 1}
      >
        Next
      </button>
    </div>
  );
};

export default FlashcardNavigation;
