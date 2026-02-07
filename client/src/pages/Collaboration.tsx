import { motion } from "framer-motion";
import { Handshake, Users, Globe, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const partners = [
  {
    name: "Aristeia",
    description: "Excellence in diplomatic discourse and international relations simulation.",
    icon: Trophy,
    color: "text-blue-500",
  },
  {
    name: "Atman",
    description: "Fostering inner leadership and global consciousness through debate.",
    icon: Users,
    color: "text-blue-500",
  },
  {
    name: "Aquarius",
    description: "Deep diving into global issues with fluidity and intellectual rigor.",
    icon: Globe,
    color: "text-blue-500",
  },
  {
    name: "The Indian Conclave",
    description: "A premier platform for discussing national and international policy.",
    icon: Handshake,
    color: "text-blue-500",
  },
];

export default function Collaboration() {
  return (
    <div className="min-h-screen bg-[#020617] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-blue-500 font-heading font-bold text-sm uppercase tracking-[0.3em] mb-4">
            Strategic Partnerships
          </h2>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-white tracking-tighter mb-8 italic">
            COLLABORATIONS
          </h1>
          <p className="text-white/60 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            We take pride in our collaborations with esteemed Model United Nations conferences, 
            working together to shape the future of global diplomacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04] transition-all duration-500 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-all duration-500" />
                <CardContent className="p-10 flex items-start gap-8">
                  <div className={`p-4 rounded-2xl bg-white/[0.03] border border-white/[0.05] ${partner.color} group-hover:scale-110 transition-transform duration-500`}>
                    <partner.icon className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-heading font-bold text-white tracking-tight">
                      {partner.name}
                    </h3>
                    <p className="text-white/50 font-light leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
