import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Menu, X, LogOut, PlusCircle, BarChart2, User, BookHeart, ClipboardList, MapPin, Mail } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"donor" | "receiver" | null>(null);
  const location = useLocation();

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    
    const path = location.pathname;
    if (storedRole === "donor" || path.includes("donor")) {
      setIsLoggedIn(true);
      setUserRole("donor");
      localStorage.setItem("userRole", "donor");
    } else if (storedRole === "receiver" || path.includes("receiver")) {
      setIsLoggedIn(true);
      setUserRole("receiver");
      localStorage.setItem("userRole", "receiver");
    } else if (path === "/" || path === "/login" || path === "/register" || path === "/about" || path === "/contact") {
      setIsLoggedIn(false);
      setUserRole(null);
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
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
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

        {isLoggedIn && userRole === "donor" && (
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/donor-dashboard" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/donor-dashboard" && "text-primary font-medium"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/new-donation" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/new-donation" && "text-primary font-medium"
              )}
            >
              Post Donation
            </Link>
            <Link 
              to="/my-donations" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/my-donations" && "text-primary font-medium"
              )}
            >
              My Donations
            </Link>
            <Link 
              to="/campaigns" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/campaigns" && "text-primary font-medium"
              )}
            >
              Campaigns
            </Link>
            <Link 
              to="/profile" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/profile" && "text-primary font-medium"
              )}
            >
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

        {isLoggedIn && userRole === "receiver" && (
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/receiver-dashboard" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/receiver-dashboard" && "text-primary font-medium"
              )}
            >
              Dashboard
            </Link>
            <Link 
              to="/food-map" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/food-map" && "text-primary font-medium"
              )}
            >
              Available Food
            </Link>
            <Link 
              to="/my-requests" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/my-requests" && "text-primary font-medium"
              )}
            >
              My Requests
            </Link>
            <Link 
              to="/campaigns" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/campaigns" && "text-primary font-medium"
              )}
            >
              Campaigns
            </Link>
            <Link 
              to="/profile" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/profile" && "text-primary font-medium"
              )}
            >
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

        {!isLoggedIn && (
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/" && "text-primary font-medium"
              )}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/about" && "text-primary font-medium"
              )}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={cn(
                "text-foreground hover:text-primary transition-colors",
                location.pathname === "/contact" && "text-primary font-medium"
              )}
            >
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

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg p-4">
          <nav className="flex flex-col gap-4">
            {isLoggedIn && userRole === "donor" ? (
              <>
                <Link
                  to="/donor-dashboard"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/donor-dashboard" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart2 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/new-donation"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/new-donation" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <PlusCircle className="h-4 w-4" />
                  Post Donation
                </Link>
                <Link
                  to="/my-donations"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/my-donations" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ClipboardList className="h-4 w-4" />
                  My Donations
                </Link>
                <Link
                  to="/campaigns"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/campaigns" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookHeart className="h-4 w-4" />
                  Campaigns
                </Link>
                <Link
                  to="/profile"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/profile" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </>
            ) : isLoggedIn && userRole === "receiver" ? (
              <>
                <Link
                  to="/receiver-dashboard"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/receiver-dashboard" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BarChart2 className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  to="/food-map"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/food-map" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MapPin className="h-4 w-4" />
                  Available Food
                </Link>
                <Link
                  to="/my-requests"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/my-requests" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Mail className="h-4 w-4" />
                  My Requests
                </Link>
                <Link
                  to="/campaigns"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/campaigns" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookHeart className="h-4 w-4" />
                  Campaigns
                </Link>
                <Link
                  to="/profile"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors flex items-center gap-2",
                    location.pathname === "/profile" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors",
                    location.pathname === "/" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors",
                    location.pathname === "/about" && "text-primary font-medium"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className={cn(
                    "text-foreground hover:text-primary py-2 transition-colors",
                    location.pathname === "/contact" && "text-primary font-medium"
                  )}
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
