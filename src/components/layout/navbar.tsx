
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Menu, X, LogOut, PlusCircle, BarChart2, User, BookHeart, ClipboardList, FileEdit } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"donor" | "receiver" | null>(null);

  useEffect(() => {
    // Check if user is logged in based on current path
    const path = window.location.pathname;
    if (path.includes("donor") || path.includes("receiver")) {
      setIsLoggedIn(true);
      setUserRole(path.includes("donor") ? "donor" : "receiver");
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handler for logout (simulated)
  const handleLogout = () => {
    // In a real app, we would clear authentication tokens here
    window.location.href = "/login";
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {isLoggedIn ? (
          <Link to={`/${userRole}-dashboard`} className="flex items-center">
            <span className="text-primary font-bold text-xl md:text-2xl">
              Ahaar<span className="text-accent">Setu</span>
            </span>
          </Link>
        ) : (
          <Link to="/" className="flex items-center">
            <span className="text-primary font-bold text-xl md:text-2xl">
              Ahaar<span className="text-accent">Setu</span>
            </span>
          </Link>
        )}

        {/* Desktop Navigation - Post Login */}
        {isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to={`/${userRole}-dashboard`} className="text-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            {userRole === "donor" && (
              <>
                <Link to="/new-donation" className="text-foreground hover:text-primary transition-colors">
                  Post Donation
                </Link>
                <Link to="/my-donations" className="text-foreground hover:text-primary transition-colors">
                  My Donations
                </Link>
                <Link to="/campaigns" className="text-foreground hover:text-primary transition-colors">
                  Campaigns
                </Link>
              </>
            )}
            {userRole === "receiver" && (
              <>
                <Link to="/view-requests" className="text-foreground hover:text-primary transition-colors">
                  View Requests
                </Link>
                <Link to="/campaigns" className="text-foreground hover:text-primary transition-colors">
                  Campaigns
                </Link>
              </>
            )}
            <Link to="/profile" className="text-foreground hover:text-primary transition-colors">
              Profile
            </Link>
            <LanguageToggle />
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        )}

        {/* Desktop Navigation - Pre Login */}
        {!isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <LanguageToggle />
            <Link to="/login">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Register
              </Button>
            </Link>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <nav className="flex flex-col gap-4">
            {isLoggedIn ? (
              // Post-login mobile menu
              <>
                <Link
                  to={`/${userRole}-dashboard`}
                  className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart2 className="h-4 w-4" />
                  Dashboard
                </Link>
                {userRole === "donor" && (
                  <>
                    <Link
                      to="/new-donation"
                      className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <PlusCircle className="h-4 w-4" />
                      Post Donation
                    </Link>
                    <Link
                      to="/my-donations"
                      className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ClipboardList className="h-4 w-4" />
                      My Donations
                    </Link>
                    <Link
                      to="/campaigns"
                      className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookHeart className="h-4 w-4" />
                      Campaigns
                    </Link>
                  </>
                )}
                {userRole === "receiver" && (
                  <>
                    <Link
                      to="/view-requests"
                      className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <ClipboardList className="h-4 w-4" />
                      View Requests
                    </Link>
                    <Link
                      to="/campaigns"
                      className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <BookHeart className="h-4 w-4" />
                      Campaigns
                    </Link>
                  </>
                )}
                <Link
                  to="/profile"
                  className="text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </>
            ) : (
              // Pre-login mobile menu
              <>
                <Link
                  to="/"
                  className="text-foreground hover:text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="text-foreground hover:text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-foreground hover:text-primary py-2 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </>
            )}
            <hr className="my-2" />
            <LanguageToggle className="justify-start px-0" />
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                className="w-full mt-2 flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            ) : (
              <div className="flex gap-2 mt-2">
                <Link to="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
