import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#020617] border-t border-white/[0.05] pt-24 pb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <div className="font-heading font-black text-3xl text-white tracking-tighter">
              ARSENIC<span className="text-blue-500">SUMMIT</span>
            </div>
            <p className="text-white/70 text-sm font-light leading-relaxed tracking-wide">
              Empowering the next generation of leaders through diplomacy, debate, and dialogue. Join us for an unparalleled MUN experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-bold text-white text-[10px] uppercase tracking-[0.3em] mb-8">Navigation</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wide flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all" />About Us</Link></li>
              <li><Link href="/committees" className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wide flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all" />Committees</Link></li>
              <li><Link href="/team" className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wide flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all" />Our Team</Link></li>
              <li><Link href="/collaboration" className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wide flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all" />Collaboration</Link></li>
              <li><Link href="/gallery" className="text-white/60 hover:text-white transition-all duration-300 text-sm font-light tracking-wide flex items-center gap-2 group"><span className="w-1 h-1 rounded-full bg-blue-500/0 group-hover:bg-blue-500 transition-all" />Gallery</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-bold text-white text-[10px] uppercase tracking-[0.3em] mb-8">Contact Us</h4>
            <ul className="space-y-6">
              <li className="flex items-start text-sm text-white/60 font-light leading-relaxed tracking-wide">
                <MapPin className="w-5 h-5 mr-4 text-blue-500 shrink-0" />
                <span>123 University Avenue,<br />Model City, ST 12345</span>
              </li>
              <li className="flex items-center text-sm text-white/60 font-light tracking-wide">
                <Phone className="w-5 h-5 mr-4 text-blue-500 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center text-sm text-white/60 font-light tracking-wide">
                <Mail className="w-5 h-5 mr-4 text-blue-500 shrink-0" />
                <span>secretariat@arsenicsummit.com</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading font-bold text-white text-[10px] uppercase tracking-[0.3em] mb-8">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-500 shadow-xl">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-500 shadow-xl">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-500 shadow-xl">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.05] pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
          <p>© {new Date().getFullYear()} Arsenic Summit MUN. All rights reserved.</p>
          <div className="flex space-x-10 mt-6 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
