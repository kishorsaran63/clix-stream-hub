import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Host {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  isLive: boolean;
}

// Mock data for hosts
const mockHosts: Host[] = [
  {
    id: "1",
    name: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    isLive: true
  },
  {
    id: "2", 
    name: "Emma R.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    isLive: false
  },
  {
    id: "3",
    name: "Alex K.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    isLive: true
  },
  {
    id: "4",
    name: "Maya L.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    isOnline: true,
    isLive: false
  },
  {
    id: "5",
    name: "Chris P.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    isOnline: false,
    isLive: false
  }
];

const LiveHostCarousel = () => {
  const [selectedHost, setSelectedHost] = useState<Host | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const handleHostClick = (host: Host) => {
    setSelectedHost(host);
    setIsPaymentModalOpen(true);
  };

  const handlePayment = (method: string) => {
    console.log(`Payment selected: ${method} for host: ${selectedHost?.name}`);
    // TODO: Implement payment processing
    setIsPaymentModalOpen(false);
    setSelectedHost(null);
  };

  return (
    <>
      <div className="w-full bg-gradient-secondary border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Connect 1-on-1 with a verified live host
            </h2>
          </div>
          
          {/* Host Carousel */}
          <div className="flex items-center justify-center gap-6 overflow-x-auto pb-2">
            {mockHosts.map((host) => (
              <div
                key={host.id}
                className="flex flex-col items-center cursor-pointer group"
                onClick={() => handleHostClick(host)}
              >
                <div className="relative">
                  {/* Ring indicator */}
                  <div
                    className={`absolute inset-0 rounded-full p-1 ${
                      host.isOnline && host.isLive 
                        ? "bg-gradient-to-r from-live to-live opacity-80" 
                        : "bg-offline"
                    }`}
                  >
                    <div className="w-full h-full bg-background rounded-full p-0.5">
                      <img
                        src={host.avatar}
                        alt={host.name}
                        className="w-16 h-16 rounded-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </div>
                  
                  {/* Live indicator */}
                  {host.isOnline && host.isLive && (
                    <div className="absolute -bottom-1 -right-1">
                      <Badge className="bg-live text-white text-xs px-1 py-0 h-5">
                        LIVE
                      </Badge>
                    </div>
                  )}
                </div>
                
                <span className="text-sm text-muted-foreground mt-2 group-hover:text-foreground transition-colors">
                  {host.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              Connect with {selectedHost?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Buy access to this host to start a live session.
            </p>
            
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Choose Payment Method:</h3>
              
              <div className="grid gap-2">
                <Button
                  onClick={() => handlePayment("UPI")}
                  variant="outline"
                  className="justify-start h-12 bg-secondary/50 hover:bg-secondary border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-gradient-primary rounded"></div>
                    <span>UPI (Google Pay / PhonePe / Paytm)</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handlePayment("Razorpay")}
                  variant="outline"
                  className="justify-start h-12 bg-secondary/50 hover:bg-secondary border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
                    <span>Razorpay</span>
                  </div>
                </Button>
                
                <Button
                  onClick={() => handlePayment("PayPal")}
                  variant="outline"
                  className="justify-start h-12 bg-secondary/50 hover:bg-secondary border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-600 rounded"></div>
                    <span>PayPal</span>
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LiveHostCarousel;