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
    <div className="flex flex-col items-center text-center group">
      <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/5 mb-6 shadow-2xl group-hover:border-primary transition-colors duration-300 relative">
        {member.imageUrl ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-3xl font-heading text-white/20">
            {member.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="text-xl font-heading font-bold text-white mb-1">{member.name}</h3>
      <div className="text-primary font-medium text-sm uppercase tracking-wide mb-2">{member.title}</div>
      {member.department && <div className="text-xs text-muted-foreground mb-3">{member.department}</div>}
      
      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {member.socialLinks?.linkedin && (
          <a href={member.socialLinks.linkedin} className="text-muted-foreground hover:text-blue-400 transition-colors">
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.socialLinks?.instagram && (
          <a href={member.socialLinks.instagram} className="text-muted-foreground hover:text-pink-500 transition-colors">
            <Instagram className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Secretariat</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The dedicated team working behind the scenes to bring you an unparalleled MUN experience.
          </p>
        </div>

        {/* Founders */}
        {founders && founders.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-heading font-bold text-center text-white/50 mb-12 uppercase tracking-widest border-b border-white/5 pb-4">Founders</h2>
            <div className="flex flex-wrap justify-center gap-16 md:gap-24">
              {founders.map(member => <MemberCard key={member.id} member={member} />)}
            </div>
          </section>
        )}

        {/* Executive Board */}
        {executives && executives.length > 0 && (
          <section className="mb-24">
            <h2 className="text-2xl font-heading font-bold text-center text-white/50 mb-12 uppercase tracking-widest border-b border-white/5 pb-4">Executive Board</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-y-20">
              {executives.map(member => <MemberCard key={member.id} member={member} />)}
            </div>
          </section>
        )}

        {/* HODs & Secretariat */}
        {(hods?.length || 0) + (secretariat?.length || 0) > 0 && (
          <section>
             <h2 className="text-2xl font-heading font-bold text-center text-white/50 mb-12 uppercase tracking-widest border-b border-white/5 pb-4">Heads of Departments</h2>
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
               {[...(hods || []), ...(secretariat || [])].map(member => <MemberCard key={member.id} member={member} />)}
             </div>
          </section>
        )}
      </div>
    </div>
  );
}
