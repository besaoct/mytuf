'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Banner: React.FC<BannerData> = ({ description, link, enddate }) => {
 
  const [countdown, setCountdown] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const currentTime = new Date().getTime() ;
    const endTime = new Date(enddate).getTime(); // Convert enddate to milliseconds
   
    console.log(endTime)
    console.log(currentTime)

    const remainingTime = endTime - currentTime; // Remaining time in milliseconds
    
    if (remainingTime > 0) {
      setCountdown(Math.max(remainingTime / 1000, 0)); // Convert milliseconds to seconds

      const intervalId = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0)); // Decrement countdown, ensuring it doesn’t go negative
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [enddate]);

  if (countdown <= 0) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div 
      onClick={() => router.push(link)} 
      className={`relative cursor-pointer font-serif min-h-[20rem] bg-white dark:bg-black p-8 h-fit rounded-md shadow-sm border 
        text-white bg-gradient-to-r from-pink-500  to-yellow-500 dark:from-black dark:via-neutral-800 dark:to-neutral-900 w-full 
        ${countdown <= 10 ? 'animate-pulse' : ''} ${countdown <= 0 && 'hidden'} justify-center items-center flex `}  
    >
      <div className="flex justify-between items-center flex-wrap gap-4 w-full h-full">
        <div className="text-2xl md:text-4xl font-bold w-full max-w-[28rem] z-[1]">
          <Link href={link} passHref target="_blank" rel="noopener noreferrer" className="hover:underline">
              {description}
          </Link>
        </div> 
        <div className="text-sm md:text-xl font-semibold bg-white dark:bg-neutral-800 text-neutral-800 dark:text-red-50 py-1 px-4 rounded-md shadow">
          <span>Offer ends in: </span>
          {formatTime(countdown)}
        </div>
      </div>
      <div className="absolute z-0 inset-0 bg-gradient-to-r from-yellow-500 to-pink-500 dark:from-black dark:via-rose-300 dark:to-neutral-900 opacity-25 rounded-lg"></div>
    </div>
  );
};

export default Banner;
