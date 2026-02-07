import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useEvents } from "@/hooks/use-events";
import { format } from "date-fns";
import { MatrixRain } from "@/components/effects/MatrixRain";

export default function Home() {
  const { data: events } = useEvents();
  const nextEvent = events?.find(e => e.status === 'upcoming');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden imperial-gradient">
        <MatrixRain color="#3b82f6" opacity={0.3} fontSize={18} speed={4} />
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-[0.2em] mb-8 backdrop-blur-md">
              <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
              Establish Diplomacy • Inspire Change
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-8 tracking-tighter leading-[0.9]">
              ARSENIC <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 block mt-2">
                SUMMIT
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto text-lg md:text-xl text-white/60 mb-12 font-light leading-relaxed tracking-wide">
              The pinnacle of Model United Nations. <br className="hidden md:block" />
              Where global strategy meets future leadership.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="h-16 px-10 rounded-full text-lg bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] border-0 w-full transition-all duration-300 hover:scale-105 active:scale-95">
                  Register Now
                </Button>
              </a>
              <Link href="/about" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-16 px-10 rounded-full text-lg border-white/10 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md w-full transition-all duration-300 hover:scale-105 active:scale-95">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Improved Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-light">Explore</span>
            <div className="w-px h-16 bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Modern Stats Section */}
      <section className="py-32 bg-[#020617] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {[
              { label: "Committees", value: "8+", icon: Users },
              { label: "Delegates", value: "500+", icon: Globe },
              { label: "Countries", value: "40+", icon: Globe },
              { label: "Editions", value: "5th", icon: Calendar },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="text-5xl md:text-6xl font-heading font-black text-white mb-3 tracking-tighter group-hover:text-blue-500 transition-colors duration-500">{stat.value}</div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Redesigned Event Section */}
      {nextEvent && (
        <section className="py-40 bg-[#020617] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass-card rounded-[3rem] p-12 md:p-20 border border-white/[0.05] relative overflow-hidden group"
            >
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/10 blur-[100px] rounded-full group-hover:bg-blue-600/20 transition-all duration-700" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Upcoming Summit
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 tracking-tight leading-tight">
                    {nextEvent.name}
                  </h2>
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 text-white/50">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-light tracking-wide">{format(new Date(nextEvent.date), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-white/10" />
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-light tracking-wide">{nextEvent.location || "TBA"}</span>
                    </div>
                  </div>
                </div>
                
                <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer" className="w-full lg:w-auto">
                  <Button className="h-20 px-12 rounded-full bg-white text-black hover:bg-white/90 font-black text-xl tracking-tight group shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] transition-all duration-300 hover:scale-105">
                    Secure Your Seat
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
