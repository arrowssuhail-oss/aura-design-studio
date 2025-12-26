import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut, User, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const navLinks = [{
  name: "About",
  href: "/#about"
}, {
  name: "Skills",
  href: "/#skills"
}, {
  name: "Projects",
  href: "/#projects"
}, {
  name: "Resume",
  href: "/#resume"
}, {
  name: "Contact",
  href: "/#contact"
}];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { user, logout } = useAuth();
  return <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6", isScrolled ? "py-4" : "py-6")}>
    <div className={cn("max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-xl shadow-md border border-border/50" : "")}>
      <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <img src={logo} alt="arrows.in logo" className="h-19 w-28 object-contain" />
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map(link => <Link key={link.name} to={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          {link.name}
        </Link>)}
        <Link to="/#contact">
          <Button variant="accent" size="sm">
            Let's Talk
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2">
              <UserCircle className="w-5 h-5" />
              <span>{user ? "Account" : "Sign In / Up"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 glass-card border-border/50 animate-fade-in">
            {user ? (
              <>
                <div className="px-2 py-1.5 text-xs text-muted-foreground border-b border-border/50 mb-1">
                  Logged in as <br /><span className="text-foreground font-medium">{user.email}</span>
                </div>
                {user.email === "arrows.suhail@gmail.com" && (
                  <Link to="/dashboard">
                    <DropdownMenuItem className="gap-2">
                      <User className="w-4 h-4" />
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                )}
                <DropdownMenuItem onClick={logout} className="gap-2 text-rose-500 focus:text-rose-500">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <Link to="/login">
                  <DropdownMenuItem className="gap-2">
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </DropdownMenuItem>
                </Link>
                <Link to="/signup">
                  <DropdownMenuItem className="gap-2">
                    <UserCircle className="w-4 h-4" />
                    Sign Up
                  </DropdownMenuItem>
                </Link>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile menu button */}
      <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>

    {/* Mobile menu */}
    {isMobileMenuOpen && <div className="md:hidden mt-2 mx-auto max-w-6xl glass-card p-6 animate-fade-up">
      <div className="flex flex-col gap-4">
        {navLinks.map(link => <Link key={link.name} to={link.href} className="text-foreground py-2 border-b border-border/50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
          {link.name}
        </Link>)}
        <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)}>
          <Button variant="accent" className="mt-2 w-full">
            Let's Talk
          </Button>
        </Link>
        <div className="border-t border-border/50 pt-4 mt-2">
          <Button
            variant="ghost"
            className="w-full justify-between gap-2 px-0 hover:bg-transparent"
            onClick={() => setIsMobileAccountOpen(!isMobileAccountOpen)}
          >
            <div className="flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-accent" />
              <span className="font-medium">{user ? "Account" : "Sign In / Up"}</span>
            </div>
            <Menu className={cn("w-4 h-4 transition-transform", isMobileAccountOpen ? "rotate-90" : "")} />
          </Button>

          {isMobileAccountOpen && (
            <div className="flex flex-col gap-2 mt-4 pl-4 animate-fade-down">
              {user ? (
                <>
                  <div className="text-xs text-muted-foreground mb-1">
                    Logged in as <span className="text-foreground">{user.email}</span>
                  </div>
                  {user.email === "arrows.suhail@gmail.com" && (
                    <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button variant="ghost" className="gap-2 w-full justify-start mt-1">
                        <User className="w-4 h-4" />
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="gap-2 w-full justify-start text-rose-500 hover:text-rose-500 hover:bg-rose-500/5">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="gap-2 w-full justify-start">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="accent" className="w-full justify-start gap-2">
                      <UserCircle className="w-4 h-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>}
  </nav>;
};
export default Navbar;