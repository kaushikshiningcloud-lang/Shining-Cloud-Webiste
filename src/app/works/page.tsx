import WorksGallery from '@/components/WorksGallery';
import YouTubeArchive from '@/components/YouTubeArchive';
import { worksImages } from '@/data/worksImages';

export default async function WorksPage() {
  const images = worksImages;
  
  return (
    <div className="w-full bg-[#020202] text-white">
       {/* Autonomous 3D Hero Section */}
       <WorksGallery images={images} />
       
       {/* New Kinetic Video Catalog below */}
       <YouTubeArchive />
    </div>
  )
}
