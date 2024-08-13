'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BannerData } from '@/types';

const Banner: React.FC<BannerData> = ({ description, link, enddate }) => {
 
  const router = useRouter();
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const currentTime = new Date().getTime() ;
    const endTime = new Date(enddate).getTime();
    const remainingTime = endTime - currentTime;
    if (remainingTime > 0) {
      setCountdown(Math.max(remainingTime / 1000, 0));

      const intervalId = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0)); 
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
    return `${hours}h: ${minutes < 10 ? '0' : ''}${minutes}m: ${secs < 10 ? '0' : ''}${secs}s`;
  };
  
  return (
    <div 
      onClick={() => router.push(link)} 
      className={`relative cursor-pointer font-serif min-h-[16rem] sm:min-h-[20rem] bg-white dark:bg-black p-8 h-fit rounded-md shadow-sm border 
        text-white bg-gradient-to-r from-pink-500  to-yellow-500 dark:from-black dark:via-neutral-800 dark:to-neutral-900 w-full 
        ${countdown <= 10 ? 'animate-pulse' : ''} ${countdown <= 0 && 'hidden'} justify-center items-center flex `}  
    >
      <div className="flex justify-between items-center flex-wrap gap-4 w-full h-full">
        <div className="text-2xl md:text-4xl font-bold w-full max-w-[28rem] z-[1] break-words whitespace-pre-line">
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




export default function MainBanner() {
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(
          `/api/banner/get-banner?banner_username=defaultBanner`,
          {
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch banner data: ${response.statusText}`
          );
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBannerData();
  }, []);

  const isVisible = !!(data && data.is_visible);

  return (
    <>
      {(loading || error) && (
        <>
         <BannerLoading/>
        </>
      )}

      {(isVisible && !loading && !error) && (
        <Banner
          description={data.description}
          link={data.link}
          is_visible={data.is_visible}
          timer={data.timer}
          startdate={data.startdate}
          enddate={data.enddate}
        />
      )}
    </>
  );
}


export const BannerLoading = () =>{
  return(
  <div className="relative cursor-pointer font-serif min-h-[16rem] sm:min-h-[20rem] bg-white dark:bg-black p-8 h-fit rounded-md shadow-sm border animate-pulse text-white bg-gradient-to-r from-pink-500  to-yellow-500 dark:from-black dark:via-red-800/10 dark:to-neutral-900 w-full justify-center items-center flex">
  <div className="flex justify-between items-center  h-full w-full">
    <div className="w-full flex flex-col gap-4">
      <div className="bg-neutral-300/20 dark:bg-neutral-600/20 h-16  w-1/2 md:w-1/2 rounded-md"></div>
      <div className="bg-neutral-300/20 dark:bg-neutral-600/20 h-14  w-4/5 md:w-3/4 rounded-md"></div>
      <div className="bg-neutral-300/10 dark:bg-neutral-600/20 h-16  w-2/3 md:w-2/3 rounded-md"></div>
    </div>
  </div>
</div>)
}