import Header from "@/components/Header";
import LiveHostCarousel from "@/components/LiveHostCarousel";
import ContentTabs from "@/components/ContentTabs";
import heroBanner from "@/assets/hero-banner.jpg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <div className="relative pt-16">
        <div 
          className="h-96 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${heroBanner})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
            <div className="container mx-auto px-4 h-full flex items-center">
              <div className="max-w-2xl">
                <h1 className="text-5xl font-bold text-white mb-4">
                  Premium Video & Photo
                  <span className="block bg-gradient-primary bg-clip-text text-transparent">
                    Content Platform
                  </span>
                </h1>
                <p className="text-xl text-gray-200 mb-6">
                  Discover exclusive videos, stunning photo albums, and connect with live hosts in our premium content ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Host Connection Bar */}
      <LiveHostCarousel />
      
      {/* Content Tabs */}
      <ContentTabs />
    </div>
  );
};

export default Index;
