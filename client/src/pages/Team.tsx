import { useTeam } from "@/hooks/use-team";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";
import { type TeamMember } from "@shared/schema";

export default function Team() {
  const { data: teamMembers, isLoading } = useTeam();

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Filter team members by roles
  const founders = teamMembers?.filter(m => m.role === 'Founder').sort((a, b) => (a.order || 0) - (b.order || 0));
  const executives = teamMembers?.filter(m => m.role === 'Executive').sort((a, b) => (a.order || 0) - (b.order || 0));
  const hods = teamMembers?.filter(m => m.role === 'HOD').sort((a, b) => (a.order || 0) - (b.order || 0));
  const secretariat = teamMembers?.filter(m => m.role === 'Secretariat').sort((a, b) => (a.order || 0) - (b.order || 0));

  const MemberCard = ({ member }: { member: TeamMember }) => (
    <motion.div 
      whileHover={{ y: -10 }}
      className="flex flex-col items-center text-center group relative"
    >
      <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border border-white/5 mb-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] group-hover:border-blue-500/50 transition-all duration-500 relative bg-[#020617]">
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-heading font-black text-white/5">
            {member.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <h3 className="text-2xl font-heading font-black text-white mb-2 tracking-tight">{member.name}</h3>
      <div className="text-blue-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">{member.title}</div>
      {member.department && <div className="text-[10px] text-white/30 font-medium uppercase tracking-widest mb-6">{member.department}</div>}
      
      <div className="flex gap-6 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
        {member.socialLinks?.linkedin && (
          <a href={member.socialLinks.linkedin} className="text-white/40 hover:text-white transition-colors">
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {member.socialLinks?.instagram && (
          <a href={member.socialLinks.instagram} className="text-white/40 hover:text-white transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="pt-32 min-h-screen bg-[#020617] pb-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              The Visionaries
            </div>
            <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-6 tracking-tighter">Our Secretariat</h1>
            <p className="text-white/40 max-w-xl mx-auto font-light leading-relaxed tracking-wide text-lg">
              The minds engineering the next era of diplomatic excellence.
            </p>
          </motion.div>
        </div>

        {/* Founders */}
        {founders && founders.length > 0 && (
          <section className="mb-40">
            <div className="flex flex-wrap justify-center gap-24 md:gap-32">
              {founders.map(member => <MemberCard key={member.id} member={member} />)}
            </div>
          </section>
        )}

        {/* Executive Board */}
        {executives && executives.length > 0 && (
          <section className="mb-40">
            <h2 className="text-[10px] font-bold text-center text-white/20 mb-20 uppercase tracking-[0.5em]">Executive Leadership</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-24 md:gap-y-32">
              {executives.map(member => <MemberCard key={member.id} member={member} />)}
            </div>
          </section>
        )}

        {/* HODs & Secretariat */}
        {(hods?.length || 0) + (secretariat?.length || 0) > 0 && (
          <section>
             <h2 className="text-[10px] font-bold text-center text-white/20 mb-20 uppercase tracking-[0.5em]">Department Leadership</h2>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-16 md:gap-y-24">
               {[...(hods || []), ...(secretariat || [])].map(member => <MemberCard key={member.id} member={member} />)}
             </div>
          </section>
        )}
      </div>
    </div>
  );
}
