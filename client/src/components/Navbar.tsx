import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navbar() {
  const [location] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Committees", href: "/committees" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
  ];

  const NavLink = ({ href, children, mobile = false }: { href: string; children: React.ReactNode, mobile?: boolean }) => (
    <Link href={href} className={cn(
      "transition-colors duration-200 font-medium hover:text-primary",
      location === href ? "text-primary font-bold" : "text-foreground/80",
      mobile ? "text-lg py-2 block" : "text-sm uppercase tracking-wide"
    )} onClick={() => mobile && setIsOpen(false)}>
      {children}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-blue-400 rounded-sm" />
            <span className="font-heading font-bold text-xl text-white tracking-tight">
              ARSENIC<span className="text-primary ml-1">SUMMIT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>{item.label}</NavLink>
            ))}
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full w-9 h-9 border border-white/10">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-white/10">
                  <DropdownMenuItem className="focus:bg-primary/20 cursor-pointer">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </DropdownMenuItem>
                  {/* Simplification: Assuming user role checks might be needed later */}
                  <Link href="/admin">
                    <DropdownMenuItem className="focus:bg-primary/20 cursor-pointer">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Admin Portal
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:bg-destructive/20 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/register">
                <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-full px-6 shadow-lg shadow-primary/25">
                  Register
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-l border-white/10 w-[80%]">
                <div className="flex flex-col space-y-6 mt-10">
                  {navItems.map((item) => (
                    <NavLink key={item.href} href={item.href} mobile>{item.label}</NavLink>
                  ))}
                  <div className="h-px bg-white/10 my-4" />
                  {isAuthenticated ? (
                    <>
                      <NavLink href="/admin" mobile>Admin Portal</NavLink>
                      <Button variant="destructive" onClick={() => logout()} className="w-full justify-start">
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary">Register Now</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
