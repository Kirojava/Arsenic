import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVerifyRegistration } from "@/hooks/use-registrations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";

const verifySchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 characters"),
});

export default function Admin() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { mutate: verify, isPending, data: verifiedData, error: verifyError } = useVerifyRegistration();
  const [lastVerifiedCode, setLastVerifiedCode] = useState<string>("");

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: { code: "" }
  });

  function onSubmit(values: z.infer<typeof verifySchema>) {
    verify(values.code);
    setLastVerifiedCode(values.code);
  }

  if (isLoading) return null;

  // Simple admin check based on hardcoded email for demo or if role exists
  // Ideally check user.role === 'admin'
  const isAdmin = user && (user.email === 'admin@arsenicsummit.com' || true); // Allowing all logged in users for demo purposes

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
        <Link href="/">
          <Button variant="outline">Return Home</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-background pb-20">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-heading font-bold text-white mb-8">Admin Dashboard</h1>

        <div className="grid gap-8">
          {/* Verification Card */}
          <Card className="glass-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-white">Verify Delegate Code</CardTitle>
              <CardDescription>Enter the 6-digit unique code provided by the delegate.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input 
                            placeholder="e.g. A1B2C3" 
                            {...field} 
                            className="bg-black/20 border-white/10 text-white font-mono uppercase tracking-widest text-lg h-12 text-center"
                            maxLength={6}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isPending} className="h-12 w-32 bg-primary hover:bg-primary/90">
                    {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verify"}
                  </Button>
                </form>
              </Form>

              {verifiedData && !isPending && (
                <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-green-500 text-lg">Verification Successful</h4>
                    <p className="text-white/80">Code: <span className="font-mono font-bold">{lastVerifiedCode}</span></p>
                    <div className="mt-2 text-sm text-white/60 space-y-1">
                      <p>Delegate: {verifiedData.user.fullName || "N/A"}</p>
                      <p>Email: {verifiedData.user.email || "N/A"}</p>
                      <p>Payment Status: <span className="uppercase">{verifiedData.paymentStatus}</span></p>
                    </div>
                  </div>
                </div>
              )}

              {verifyError && !isPending && (
                <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-4">
                  <XCircle className="w-6 h-6 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-500 text-lg">Verification Failed</h4>
                    <p className="text-white/80">{verifyError.message}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Other Admin Actions (Placeholder) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <Card className="glass-card border-white/5 hover:border-primary/20 cursor-pointer transition-colors">
               <CardContent className="p-6 flex flex-col items-center text-center">
                 <h3 className="text-white font-bold mb-2">Manage Committees</h3>
                 <p className="text-sm text-muted-foreground">Update agendas, chairs, and allocations.</p>
               </CardContent>
             </Card>
             <Card className="glass-card border-white/5 hover:border-primary/20 cursor-pointer transition-colors">
               <CardContent className="p-6 flex flex-col items-center text-center">
                 <h3 className="text-white font-bold mb-2">Export Data</h3>
                 <p className="text-sm text-muted-foreground">Download delegate list as CSV.</p>
               </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
