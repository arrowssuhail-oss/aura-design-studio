import { Button } from "@/components/ui/button";
import { ArrowDown, Download } from "lucide-react";
const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6">
    {/* Animated gradient orb */}
    <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-accent/30 via-accent/10 to-transparent blur-3xl animate-pulse-slow" />
    <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/20 via-transparent to-transparent blur-3xl animate-float" />

    <div className="relative z-10 max-w-5xl mx-auto text-center">
      <div className="animate-fade-up" style={{
        animationDelay: "0.1s"
      }}>
        <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-8">
          Available for new projects
        </span>
      </div>

      <h1
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-up"
        style={{ animationDelay: "0.2s" }}
      >
        Arrows <span className="gradient-text">Design</span>
      </h1>

      <p
        className="text-xl md:text-2xl text-muted-foreground font-light mb-8 animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        Designer + Creator — Crafting Minimal, Meaningful Designs
      </p>

      <div
        className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
        style={{ animationDelay: "0.4s" }}
      >
        <Button variant="accent" size="lg" className="group" asChild>
          <a href="#projects">
            View Projects
            <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
          </a>
        </Button>
        <Button variant="glass" size="lg" asChild>
          <a href="/MUHAMMED SUHAIL CV.pdf" download="MUHAMMED_SUHAIL_CV.pdf">
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </a>
        </Button>
      </div>
    </div>

    {/* Scroll indicator */}
    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-fade-in" style={{
      animationDelay: "0.8s"
    }}>
      <span className="text-xs uppercase tracking-widest">Scroll</span>
      <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
    </div>
  </section >;
};
export default HeroSection;