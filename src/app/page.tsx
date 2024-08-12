'use client'

import Banner from "@/components/Banner";
import MainComponent from "@/components/HomeMain";
import { useEffect, useState } from "react";


export default function Home() {
  const [data, setData] = useState<BannerData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await fetch(`/api/banner/get-banner?banner_username=defaultBanner`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch banner data: ${response.statusText}`);
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
   

 const isVisible = !! (data && data.is_visible)

  return (
<section className="flex flex-col gap-4">

      {isVisible && (
        <Banner
          description={data.description}
          link={data.link}
          is_visible={data.is_visible} 
          timer={data.timer} startdate={data.startdate} 
          enddate={data.enddate}  
          />
      )}

  <MainComponent/>
</section>
  );
}
