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
import StoryViewer from "@/components/StoryViewer";
const navLinks = [{
  name: "About",
  href: "/#about"
}, {
  name: "Skills",
  href: "/#skills"
}, {
  name: "Projects",
  href: "/#works"
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle background transparency
      setIsScrolled(currentScrollY > 50);

      // Handle hide/show on mobile scroll
      if (window.innerWidth < 768) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px - Hide
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close menu if open
        } else {
          // Scrolling up - Show
          setIsVisible(true);
        }
      } else {
        setIsVisible(true); // Always visible on desktop
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const { user, logout } = useAuth();

  // Story State
  const [storyData, setStoryData] = useState<{ content: string; type: 'image' | 'video'; timestamp: number } | null>(null);
  const [isStoryOpen, setIsStoryOpen] = useState(false);
  const [hasUnseenStory, setHasUnseenStory] = useState(false);

  useEffect(() => {
    const checkStory = () => {
      const stored = localStorage.getItem("arrows_story_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.active && (Date.now() - parsed.timestamp < 24 * 60 * 60 * 1000)) { // 24h expiry
          setStoryData(prev => {
            if (prev?.timestamp === parsed.timestamp) return prev; // No change
            return parsed;
          });

          // Check if seen locally
          const seenTimestamp = localStorage.getItem("arrows_story_seen");
          setHasUnseenStory(seenTimestamp !== parsed.timestamp.toString());
        } else {
          setStoryData(null);
        }
      } else {
        setStoryData(null);
      }
    };

    checkStory();
    const interval = setInterval(checkStory, 2000); // Check every 2s for updates
    return () => clearInterval(interval);
  }, []);

  const handleStoryClick = () => {
    if (!storyData) return;
    setIsStoryOpen(true);
    setHasUnseenStory(false);
    localStorage.setItem("arrows_story_seen", storyData.timestamp.toString());
  };

  return (
    <>
      <nav className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        isScrolled ? "py-4" : "py-6",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className={cn("max-w-6xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300", isScrolled ? "bg-background/80 backdrop-blur-xl shadow-md border border-border/50" : "")}>
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <img src={logo} alt="arrows.in logo" className="h-19 w-28 object-contain" />
            </Link>

            {/* Story Ring */}
            {storyData && (
              <button
                onClick={handleStoryClick}
                className="group relative flex items-center justify-center -ml-2 transition-transform hover:scale-105"
              >
                <div className={cn(
                  "absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 opacity-100",
                  hasUnseenStory ? "animate-spin-slow p-[2px]" : "p-[1px] grayscale opacity-50"
                )}>
                  <div className="w-full h-full bg-background rounded-full" />
                </div>
                <div className={cn(
                  "relative w-10 h-10 rounded-full border-2 border-background overflow-hidden",
                  hasUnseenStory ? "w-10 h-10" : "w-10 h-10 opacity-80"
                )}>
                  <img src={storyData.content} alt="Story" className="w-full h-full object-cover" />
                </div>
              </button>
            )}
          </div>

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
      </nav>

      {/* Story Overlay */}
      <StoryViewer
        isOpen={isStoryOpen}
        onClose={() => setIsStoryOpen(false)}
        storyData={storyData}
      />
    </>
  );
};
export default Navbar;