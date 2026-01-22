import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Register() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="pt-24 min-h-screen bg-background pb-20 flex items-center justify-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">Delegate Registration</h1>
        <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
          Secure your spot at the Arsenic Summit. Registration is now handled through our official Google Form.
        </p>

        {!isAuthenticated && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center mb-8">
            <p className="text-white mb-4">You should be logged in to access our community features.</p>
            <Button onClick={() => window.location.href = "/api/login"} className="bg-primary hover:bg-primary/90">
              Login with Replit
            </Button>
          </div>
        )}

        <div className="glass-card p-10 rounded-3xl border border-white/10 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Official Registration Form</h2>
          <p className="text-sm text-muted-foreground mb-8">
            Please complete the form in the new window to secure your committee preferences and delegate spot.
          </p>
          <a href="https://forms.google.com" target="_blank" rel="noopener noreferrer">
            <Button className="w-full bg-primary hover:bg-primary/90 h-14 text-lg font-bold shadow-lg shadow-primary/25 rounded-full">
              Open Google Form
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
