import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center">
            About Arsenic Summit
          </h1>
          
          <div className="prose prose-invert prose-lg mx-auto">
            <p className="lead text-xl text-muted-foreground mb-8 text-center">
              Arsenic Summit is more than just a conference; it is a platform for the leaders of tomorrow to engage with the pressing issues of today.
            </p>

            {/* Unsplash image with descriptive comment */}
            {/* Model United Nations conference hall delegates discussing */}
            <div className="my-12 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?w=1200&h=600&fit=crop" 
                alt="Conference Hall" 
                className="w-full h-auto object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h3>
            <p>
              We strive to cultivate a deep understanding of international relations, diplomacy, and global policy among students. Through rigorous debate and collaborative problem-solving, delegates at Arsenic Summit develop critical thinking skills and a nuanced perspective on world affairs.
            </p>

            <h3 className="text-2xl font-bold text-white mt-12 mb-4">The Experience</h3>
            <p>
              Delegates are assigned countries and committees where they must represent their nation's interests while working towards consensus. Our committees range from the UN General Assembly to specialized crisis cabinets, offering challenges for both novice and experienced debaters.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="glass-card p-6 rounded-xl border border-white/5">
                <h4 className="text-primary font-bold mb-2">Debate</h4>
                <p className="text-sm text-muted-foreground">Engage in structured debate following standard rules of procedure to effectively communicate your stance.</p>
              </div>
              <div className="glass-card p-6 rounded-xl border border-white/5">
                <h4 className="text-primary font-bold mb-2">Diplomacy</h4>
                <p className="text-sm text-muted-foreground">Negotiate with other delegates during unmoderated caucuses to form blocs and write resolutions.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
