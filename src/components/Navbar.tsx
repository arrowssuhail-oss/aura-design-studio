import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
const navLinks = [{
  name: "About",
  href: "#about"
}, {
  name: "Skills",
  href: "#skills"
}, {
  name: "Projects",
  href: "#projects"
}, {
  name: "Resume",
  href: "#resume"
}, {
  name: "Contact",
  href: "#contact"
}];
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return <nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6", isScrolled ? "py-4" : "py-6")}>
      <div className={cn("max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-xl shadow-md border border-border/50" : "")}>
        <a href="#" className="flex items-center">
          <img src={logo} alt="arrows.in logo" className="h-8 w-auto object-contain" />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.name}
            </a>)}
          <Link to="/contact">
            <Button variant="accent" size="sm">
              Let's Talk
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && <div className="md:hidden mt-2 mx-auto max-w-6xl glass-card p-6 animate-fade-up">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-foreground py-2 border-b border-border/50 last:border-0" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>)}
            <Link to="/contact">
              <Button variant="accent" className="mt-2">
                Let's Talk
              </Button>
            </Link>
          </div>
        </div>}
    </nav>;
};
export default Navbar;