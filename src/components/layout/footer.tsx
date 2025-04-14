
import { Link } from "react-router-dom";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">AhaarSetu</h3>
            <p className="text-muted-foreground mb-4">
              Connecting food donors with those in need. Our mission is to reduce food waste
              and feed the hungry through a simple but powerful platform.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-primary transition-colors">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Contact Us</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:info@ahaarsetu.org" className="text-muted-foreground hover:text-primary transition-colors">
                  info@ahaarsetu.org
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-muted-foreground">
                  123 Food Street, Hunger Solutions<br />
                  Hyderabad, Telangana, 500001
                </span>
              </li>
            </ul>
          </div>

          {/* Language */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-4">Language</h3>
            <LanguageToggle />
          </div>
        </div>

        <div className="border-t border-border pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} AhaarSetu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
