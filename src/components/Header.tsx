import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Login",
    "Sign Up", 
    "Subscriptions",
    "Watch History",
    "Liked",
    "Newest Videos",
    "Best Videos", 
    "Moments",
    "Top Creators",
    "Top Creator Videos",
    "Categories",
    "Photos"
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      // TODO: Implement search functionality
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200">
            ClixGallery
          </a>
        </div>

        {/* Right Section - Search & Menu */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search videos, albums, hosts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-80 bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <Button 
              onClick={handleSearch}
              variant="default"
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile Search */}
          <div className="flex md:hidden items-center gap-2">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="w-40 bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <Button 
              onClick={handleSearch}
              variant="default"
              size="sm"
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              <Search className="w-4 h-4" />
            </Button>
          </div>

          {/* Hamburger Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-card border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <nav className="space-y-2">
                {menuItems.map((item, index) => {
                  let href = "/";
                  if (item === "Login" || item === "Sign Up") {
                    href = "/auth";
                  } else {
                    href = `/${item.toLowerCase().replace(/\s+/g, '-')}`;
                  }
                  
                  return (
                    <a
                      key={index}
                      href={href}
                      className="block px-4 py-3 text-foreground hover:bg-secondary/50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </a>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;