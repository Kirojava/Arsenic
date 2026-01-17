import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="font-heading font-bold text-2xl text-white">
              ARSENIC<span className="text-primary">SUMMIT</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Empowering the next generation of leaders through diplomacy, debate, and dialogue. Join us for an unforgettable MUN experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About Us</Link></li>
              <li><Link href="/committees" className="text-muted-foreground hover:text-primary transition-colors text-sm">Committees</Link></li>
              <li><Link href="/team" className="text-muted-foreground hover:text-primary transition-colors text-sm">Our Team</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors text-sm">Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-muted-foreground">
                <MapPin className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>123 University Avenue,<br />Model City, ST 12345</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Phone className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-5 h-5 mr-3 text-primary shrink-0" />
                <span>secretariat@arsenicsummit.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:scale-110 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Arsenic Summit MUN. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
