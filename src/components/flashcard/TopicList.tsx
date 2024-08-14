'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Topic } from '@/types';
import { BiLoader } from 'react-icons/bi';

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading]=useState(true);

  useEffect(() => {
    const fetchTopicsWithCards = async () => {
      try {
        const response = await fetch('/api/flashcards/topics-with-cards', {
          // cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTopics(data);
     
      } catch (error) {
        console.error('Error fetching topics with flashcards:', error);
      } finally{
        setLoading(false)
      }
    };

    fetchTopicsWithCards();
  }, []);


  return (
    <div className="p-4 bg-white dark:bg-black rounded-md">
  <div className='flex items-center gap-2 mb-4'>
  <h2 className="text-xl font-bold">Topics</h2>
  <Link href={'/dashboard?manage=flash-cards'} className='underline pl-2 border-l'>Create new</Link>
  </div>
      {
        loading && <>
        <BiLoader size={20} className='animate-spin inline'/> loading topics...
        </>
      }

{!loading &&  <>
  {(topics.length>=1) ?
      <ul className="flex gap-4 items-start flex-wrap">
      {topics.map((topic) => (
        <li key={topic.slug} className="text-sm">
          <Link href={`/flashcards/${topic.slug}`} className="hover:underline text-rose-500">
            {topic.name} ({topic.flashcards[0].id!==null ? topic.flashcards.length:0} {topic.flashcards.length>1? 'flashcards' : 'flashcard'})
          </Link>
        </li>
      ))}
    </ul>
    :
    <>
    <p> No topics found </p>
    </>
     }
</>
     }
    </div>
  );
};

export default TopicList;
