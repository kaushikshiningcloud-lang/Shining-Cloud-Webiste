import fs from 'fs';
import path from 'path';
import WorksGallery from '@/components/WorksGallery';
import YouTubeArchive from '@/components/YouTubeArchive';

export default async function WorksPage() {
  const worksDir = path.join(process.cwd(), 'public', 'images', 'works');
  let files: string[] = [];

  try {
    files = fs.readdirSync(worksDir);
  } catch (e) {
    console.error("Directory not found or unreadable:", e);
  }
  
  const images = files.filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file));
  
  return (
    <div className="w-full bg-[#020202] text-white">
       {/* Autonomous 3D Hero Section */}
       <WorksGallery images={images} />
       
       {/* New Kinetic Video Catalog below */}
       <YouTubeArchive />
    </div>
  )
}
