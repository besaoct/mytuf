
import MainComponent from "@/components/HomeMain";
import HomePage from "@/components/HomePage";

export default function Home() {
  
  return (
<section className="flex flex-col gap-4">
  <HomePage/>
  <MainComponent/>
</section>
  );
}
