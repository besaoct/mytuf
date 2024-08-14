
// import TopicList from "@/components/flashcard/TopicList";
import MainBanner from "@/components/Homebanner";
import MainComponent from "@/components/HomeMain";


export default function Home() {
  
  return (
<section className="flex flex-col gap-4">
      <MainBanner/>
      <MainComponent/>
      {/* <TopicList/> */}
</section>
  );
}
