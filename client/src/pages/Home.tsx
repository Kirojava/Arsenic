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
        <MatrixRain color="#173E7D" opacity={0.4} fontSize={18} speed={3} />
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[120px]" />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              Establish Diplomacy • Inspire Change
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-6 leading-tight">
              ARSENIC <br className="md:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                SUMMIT
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
              Join the most prestigious Model United Nations conference of the year. 
              Engage in high-level debate, draft resolutions, and shape the future.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="h-14 px-8 rounded-full text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 w-full sm:w-auto">
                  Register Now
                </Button>
              </a>
              <Link href="/about">
                <Button size="lg" variant="outline" className="h-14 px-8 rounded-full text-lg border-white/20 hover:bg-white/5 text-white w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/40 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Committees", value: "8+", icon: Users },
              { label: "Delegates", value: "500+", icon: Globe },
              { label: "Countries", value: "40+", icon: Globe },
              { label: "Editions", value: "5th", icon: Calendar },
            ].map((stat, i) => (
              <div key={i} className="p-6">
                <stat.icon className="w-8 h-8 mx-auto text-primary mb-4 opacity-80" />
                <div className="text-4xl font-heading font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Event Countdown Snippet */}
      {nextEvent && (
        <section className="py-24 bg-background relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="text-left">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/20 text-primary text-sm font-semibold mb-4">
                  UPCOMING EVENT
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                  {nextEvent.name}
                </h2>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>{format(new Date(nextEvent.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <div className="w-px h-4 bg-white/20" />
                  <div>{nextEvent.location || "TBA"}</div>
                </div>
              </div>
              <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">
                <Button className="h-12 px-8 rounded-full bg-white text-background hover:bg-white/90 font-bold group">
                  Secure Your Seat 
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
