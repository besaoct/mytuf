'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useToast } from '../ui/use-toast';

interface BannerSettings {
  is_visible: boolean;
  description: string;
  timer: number; 
  link: string;
  enddate:string;
  bannerUsername: string;
}

const DashboardBanner: React.FC = () => {
  const { toast } = useToast()
  const [is_visible, setVisible] = useState<boolean>(true);
  const [description, setDescription] = useState<string>("");
  const [enddate, setEnddate] = useState<string>("");
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [link, setLink] = useState<string>("/tuf-plus");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const router = useRouter();
  const bannerUsername = "defaultBanner";


  const handleSave = async () => {
    const totalTimerInSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    try {
      const response = await fetch('/api/banner/save-banner', {
        // cache:'no-store',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          is_visible:is_visible,
          description,
          timer: totalTimerInSeconds,
          link,
          bannerUsername, 
          enddate
        }),
      });

      if (!response.ok) {
        if (response.status === 400) {
          setError('Invalid data provided');
        } else {
          setError(`Error: ${response.status} ${response.statusText}`);
        }
        return;
      }
      const newData = await response.json()
      setEnddate(newData.enddate);
      setSuccess(newData.message);
      toast({title:"Success", description:"Banner saved successfully"})
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      toast({title:"Error", description:"Something went wrong!"})
      setError('An unexpected error occurred.');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`/api/banner/get-banner?banner_username=${bannerUsername}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Banner settings not found');
          } else {
            setError(`Error: ${response.status} ${response.statusText}`);
          }
          return;
        }

        const data: BannerSettings = await response.json();
        const timerInSeconds = data.timer;
        setVisible(data.is_visible);
        setEnddate(data.enddate);
        setDescription(data.description);
        setLink(data.link);
        setDays(Math.floor(timerInSeconds / 86400));
        setHours(Math.floor((timerInSeconds % 86400) / 3600));
        setMinutes(Math.floor((timerInSeconds % 3600) / 60));
        setSeconds(timerInSeconds % 60);
      } catch (error) {
        setError('An unexpected error occurred.');
      }
    };

    fetchSettings();
  }, []);

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


  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h: ${minutes < 10 ? '0' : ''}${minutes}m: ${secs < 10 ? '0' : ''}${secs}s`;
  };
  

  return (
    <div className="mx-auto p-4 bg-white dark:bg-black rounded-md shadow-sm flex flex-col gap-4 w-full">
      <h2 onClick={() => router.back()} className="font-medium  cursor-pointer flex items-center bg-accent p-2 pr-4 rounded-md w-fit">
        <BiChevronLeft  size={20} className='inline cursor-pointer w-fit p-0 ' /> Back
      </h2>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{'Too many connections!!! As i am using a free tier service for mysql db, please try again later... '}</div>}
      {success && <div className="bg-green-100 text-green-600 p-4 rounded mb-4">{success}</div>}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-center justify-start gap-4">
          <label htmlFor='bannerToggleVisibility' className="text-sm font-medium select-none cursor-pointer">
            {!is_visible ? 'Enable banner' : 'Disable banner'}
          </label>
          <button
            id='bannerToggleVisibility'
            onClick={() => setVisible(!is_visible)}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
              is_visible ? 'bg-rose-600' : 'bg-neutral-400'
            }`}
          >
            <span
              className={`${
                is_visible ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
            />
          </button>
        </div>

        <div>
          <label className="block mb-2 font-medium">Banner Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-md border max-h-32 focus:outline-none"
            rows={3}
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Timer</label>
           <div className='mb-2'>
              Countdown of previous banner: <span className='inline text-rose-600'> {formatTime(countdown)}</span>
           </div>
          <div className="flex space-x-4">
            <div>
              <input
                type="number"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full p-3 rounded-md border  focus:outline-none"
                min="0"
              />
              <label className="block text-muted-foreground text-center mt-1">Days</label>
            </div>
            <div>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full p-3 rounded-md border  focus:outline-none"
                min="0"
              />
              <label className="block text-muted-foreground text-center mt-1">Hours</label>
            </div>
            <div>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full p-3 rounded-md border focus:outline-none"
                min="0"
              />
              <label className="block text-muted-foreground text-center mt-1">Minutes</label>
            </div>
            <div>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="w-full p-3 rounded-md border focus:outline-none"
                min="0"
              />
              <label className="block text-muted-foreground text-center mt-1">Seconds</label>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 rounded-lg border focus:outline-none"
          />
        </div>

        <div className="text-right">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-rose-600 text-white font-medium rounded-md shadow hover:bg-rose-700 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
