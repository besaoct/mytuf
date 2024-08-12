"use client";

import Banner from "@/components/Banner";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(
          `/api/banner/get-banner?banner_username=defaultBanner`,
          {
            // cache: "no-store",
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
          <div className="relative cursor-pointer font-serif min-h-[16rem] sm:min-h-[20rem] bg-white dark:bg-black p-8 h-fit rounded-md shadow-sm border animate-pulse text-white bg-gradient-to-r from-pink-500  to-yellow-500 dark:from-black dark:via-red-800/10 dark:to-neutral-900 w-full justify-center items-center flex">
            <div className="flex justify-between items-center  h-full w-full">
              <div className="w-full flex flex-col gap-4">
                <div className="bg-neutral-300/20 dark:bg-neutral-600/20 h-16  w-1/2 md:w-1/2 rounded-md"></div>
                <div className="bg-neutral-300/20 dark:bg-neutral-600/20 h-14  w-4/5 md:w-3/4 rounded-md"></div>
                <div className="bg-neutral-300/10 dark:bg-neutral-600/20 h-16  w-2/3 md:w-2/3 rounded-md"></div>
              </div>
            </div>
          </div>
        </>
      )}

      {isVisible && (
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
