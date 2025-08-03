import { useState } from "react";
import { Play, Lock, Heart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Video {
  id: string;
  title: string;
  creator: string;
  thumbnail: string;
  duration: string;
  views: number;
  likes: number;
  isPaid: boolean;
  isLocked: boolean;
  previewUrl?: string;
}

interface VideoGridProps {
  videos: Video[];
  title: string;
}

// Mock video data
const freeVideos: Video[] = [
  {
    id: "1",
    title: "Amazing Nature Documentary",
    creator: "NatureFilms",
    thumbnail: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=225&fit=crop",
    duration: "10:45",
    views: 15420,
    likes: 892,
    isPaid: false,
    isLocked: false
  },
  {
    id: "2", 
    title: "Coding Tutorial: React Basics",
    creator: "TechGuru",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    duration: "25:30",
    views: 8750,
    likes: 456,
    isPaid: false,
    isLocked: false
  },
  {
    id: "3",
    title: "Creative Photography Tips",
    creator: "PhotoMaster",
    thumbnail: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?w=400&h=225&fit=crop",
    duration: "15:20",
    views: 12300,
    likes: 678,
    isPaid: false,
    isLocked: false
  },
  {
    id: "4",
    title: "Productivity Workflow",
    creator: "WorkSmart",
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=225&fit=crop",
    duration: "18:45",
    views: 9870,
    likes: 543,
    isPaid: false,
    isLocked: false
  }
];

const paidVideos: Video[] = [
  {
    id: "5",
    title: "Advanced Business Strategies",
    creator: "BusinessPro",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=225&fit=crop",
    duration: "45:20",
    views: 25600,
    likes: 1240,
    isPaid: true,
    isLocked: true
  },
  {
    id: "6",
    title: "Premium Design Masterclass",
    creator: "DesignStudio",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    duration: "60:15",
    views: 18900,
    likes: 890,
    isPaid: true,
    isLocked: true
  }
];

const VideoCard = ({ video }: { video: Video }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
    return views.toString();
  };

  const handleVideoClick = () => {
    if (video.isPaid && video.isLocked) {
      console.log("Redirect to purchase page for:", video.title);
      // TODO: Implement purchase modal
    } else {
      console.log("Play video:", video.title);
      // TODO: Implement video player
    }
  };

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleVideoClick}
    >
      <div className="relative bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200">
            {/* Play button or Lock icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              {video.isPaid && video.isLocked ? (
                <div className="bg-background/90 rounded-full p-3">
                  <Lock className="w-6 h-6 text-foreground" />
                </div>
              ) : (
                <div className="bg-primary/90 rounded-full p-3 group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-primary-foreground fill-current" />
                </div>
              )}
            </div>
            
            {/* Duration */}
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="bg-black/80 text-white text-xs">
                {video.duration}
              </Badge>
            </div>
            
            {/* Paid indicator */}
            {video.isPaid && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-gradient-primary text-primary-foreground text-xs">
                  PREMIUM
                </Badge>
              </div>
            )}
          </div>
        </div>
        
        {/* Video Info */}
        <div className="p-4">
          <h3 className="font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {video.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{video.creator}</p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{formatViews(video.views)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                <span>{formatViews(video.likes)}</span>
              </div>
            </div>
            
            {video.isPaid && video.isLocked && (
              <Button size="sm" variant="outline" className="h-6 text-xs">
                Buy Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoGrid = ({ videos, title }: VideoGridProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
};

export { VideoGrid, freeVideos, paidVideos };