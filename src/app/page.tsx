import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import ImmersiveStory from "@/components/ImmersiveStory";
import ProcessTimeline from "@/components/ProcessTimeline";

export default function Home() {
  return (
    <div className="bg-archivi-dark w-full">
      <HeroSection />
      <Marquee />
      <div className="bg-archivi-light w-full">
        <ImmersiveStory />
        <ProcessTimeline />
      </div>
    </div>
  );
}
