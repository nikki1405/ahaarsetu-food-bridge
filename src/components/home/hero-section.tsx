
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070')", 
          backgroundSize: "cover" 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-ahaarsetu-yellow-300">Share Food, Spread Smiles</span>
            <br />Welcome to AhaarSetu
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Connecting food donors with those in need - Join us in our mission to reduce food waste
            and ensure no one goes hungry in our community.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register?type=donor">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2">
                <Heart className="h-5 w-5" />
                Donate Food
              </Button>
            </Link>
            <Link to="/register?type=receiver">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 gap-2 bg-white/10 backdrop-blur-sm border-white/30">
                <Search className="h-5 w-5" />
                Find Food
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
