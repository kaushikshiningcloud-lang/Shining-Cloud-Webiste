import HeroSection from "@/components/HeroSection";
import Marquee from "@/components/Marquee";
import FeaturedProjects from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <div className="bg-archivi-dark w-full">
      <HeroSection />
      <Marquee />
      <div className="bg-archivi-light w-full">
        {/* The interactive kiosk - Light Theme */}
        <FeaturedProjects />
      </div>
    </div>
  );
}
