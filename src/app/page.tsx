
import MainBanner, { BannerLoading } from "@/components/Homebanner";
import MainComponent from "@/components/HomeMain";
import { Suspense } from "react";


export default function Home() {
  
  return (
<section className="flex flex-col gap-4">
   <Suspense fallback={<BannerLoading/>}>
      <MainBanner/>
   </Suspense>
  <MainComponent/>
</section>
  );
}
