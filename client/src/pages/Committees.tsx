import { useCommittees } from "@/hooks/use-committees";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, FileText, User } from "lucide-react";

export default function Committees() {
  const { data: committees, isLoading } = useCommittees();

  if (isLoading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Our Committees</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your arena. From the General Assembly to specialized agencies, find the committee that challenges you.
          </p>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {committees?.map((committee) => (
            <motion.div key={committee.id} variants={item}>
              <Card className="glass-card h-full flex flex-col hover:border-primary/50 transition-colors group overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  {committee.imageUrl ? (
                    <img 
                      src={committee.imageUrl} 
                      alt={committee.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-black flex items-center justify-center">
                      <Users className="w-16 h-16 text-primary/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="text-xs font-bold bg-primary px-2 py-1 rounded text-white mb-1 inline-block">
                      {committee.abbreviation}
                    </span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-white font-heading">{committee.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{committee.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <FileText className="w-4 h-4 mt-1 text-primary" />
                      <span className="font-semibold text-white/80">Agenda:</span>
                    </div>
                    <p className="pl-6 line-clamp-3 italic text-white/60">{committee.agenda}</p>
                  </div>
                </CardContent>

                <CardFooter className="pt-6">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10">
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#0f172a] border-white/10 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-heading text-primary">{committee.name}</DialogTitle>
                        <DialogDescription className="text-lg text-white/80 font-medium pt-2">
                          Agenda: {committee.agenda}
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
                        <div className="space-y-4">
                          <h4 className="font-bold text-white border-b border-white/10 pb-2">Description</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {committee.description}
                          </p>
                          
                          {committee.guideUrl && (
                            <Button variant="outline" className="w-full mt-4 border-primary text-primary hover:bg-primary hover:text-white">
                              <FileText className="w-4 h-4 mr-2" />
                              Download Background Guide
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <h4 className="font-bold text-white border-b border-white/10 pb-2 flex items-center">
                            <User className="w-4 h-4 mr-2 text-primary" />
                            Executive Board
                          </h4>
                          {committee.chairName ? (
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 rounded-full bg-white/5 overflow-hidden flex-shrink-0">
                                {committee.chairImageUrl ? (
                                  <img src={committee.chairImageUrl} alt={committee.chairName} className="w-full h-full object-cover" />
                                ) : (
                                  <User className="w-8 h-8 m-4 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <div className="font-bold text-white">{committee.chairName}</div>
                                <div className="text-xs text-primary mb-2">Chairperson</div>
                                <p className="text-xs text-muted-foreground">{committee.chairBio || "Bio coming soon..."}</p>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground italic">Executive Board to be announced.</p>
                          )}
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
