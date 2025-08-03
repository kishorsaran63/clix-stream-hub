import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoGrid, freeVideos, paidVideos } from "./VideoGrid";
import { Badge } from "@/components/ui/badge";

// Mock album data
const albums = [
  {
    id: "1",
    title: "Urban Photography Collection",
    artist: "CityVibes",
    coverImage: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=400&fit=crop",
    photoCount: 25,
    price: "$9.99"
  },
  {
    id: "2", 
    title: "Nature Landscapes",
    artist: "WildCapture",
    coverImage: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&h=400&fit=crop",
    photoCount: 40,
    price: "$14.99"
  },
  {
    id: "3",
    title: "Portrait Series",
    artist: "StudioPro",
    coverImage: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
    photoCount: 18,
    price: "$7.99"
  },
  {
    id: "4",
    title: "Minimalist Architecture",
    artist: "ModernDesign",
    coverImage: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=400&fit=crop",
    photoCount: 32,
    price: "$12.99"
  }
];

const AlbumCard = ({ album }: { album: any }) => {
  const handleAlbumClick = () => {
    console.log("Redirect to album purchase:", album.title);
    // TODO: Implement album purchase page
  };

  return (
    <div 
      className="group cursor-pointer"
      onClick={handleAlbumClick}
    >
      <div className="bg-card rounded-lg overflow-hidden shadow-card hover:shadow-glow transition-all duration-300 transform hover:scale-105">
        {/* Cover Image */}
        <div className="relative aspect-square bg-muted">
          <img
            src={album.coverImage}
            alt={album.title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-primary/90 rounded-full px-4 py-2 group-hover:scale-110 transition-transform duration-200">
                <span className="text-primary-foreground font-medium text-sm">View Album</span>
              </div>
            </div>
            
            {/* Photo count */}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-black/80 text-white text-xs">
                {album.photoCount} photos
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Album Info */}
        <div className="p-4">
          <h3 className="font-medium text-foreground line-clamp-1 mb-1 group-hover:text-primary transition-colors">
            {album.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">{album.artist}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-primary font-semibold">{album.price}</span>
            <Badge variant="outline" className="border-primary/30 text-primary">
              Album
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContentTabs = () => {
  const [activeTab, setActiveTab] = useState("free");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-4 sm:mb-0">
          Today's Content
        </h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger 
              value="free" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Free Videos
            </TabsTrigger>
            <TabsTrigger 
              value="paid"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Paid Videos
            </TabsTrigger>
            <TabsTrigger 
              value="albums"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Albums
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="free" className="mt-6">
          <VideoGrid videos={freeVideos} title="" />
        </TabsContent>
        
        <TabsContent value="paid" className="mt-6">
          <VideoGrid videos={paidVideos} title="" />
        </TabsContent>
        
        <TabsContent value="albums" className="mt-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {albums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentTabs;