export interface BannerData {
    is_visible:boolean
    description: string;
    timer: number;
    link: string;
    startdate: string; 
    enddate: string; 
  }

  export interface FlashcardTypes {
    id?: number;
    question: string;
    answer: string;
    topic_id?: number; // For flashcards
  }
  
  export interface Topic {
    id?: number;
    name: string;
    slug: string;
    flashcards: Flashcard[];
  }