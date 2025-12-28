import { ArrowLeft, Palette, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Identity = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 flex items-center justify-center">
              <Palette className="w-8 h-8 text-rose-500" />
            </div>
            <div>
              <span className="text-rose-500 text-sm font-medium uppercase tracking-widest">Graphic Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">Custom & Unique Identity</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            A complete brand identity overhaul for a modern tech startup, encompassing logo design, color systems, typography, and comprehensive brand guidelines.
          </p>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-rose-500/30 to-rose-500/5 flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-48 h-48 rounded-full bg-foreground/5 animate-float" style={{ top: '15%', left: '65%' }} />
            <div className="absolute w-36 h-36 rounded-lg bg-foreground/10 animate-float" style={{ top: '55%', left: '15%', animationDelay: '0.5s' }} />
            <div className="absolute w-24 h-24 rounded-full bg-foreground/5 animate-float" style={{ top: '25%', left: '35%', animationDelay: '1s' }} />
            <Palette className="w-32 h-32 text-foreground/40" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Establish a unified visual language that communicates innovation through layout and color, ensuring consistent graphic application across all brand touchpoints.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              A geometric design framework utilizing a high-contrast color palette and structured typography to create a recognizable and scalable aesthetic for digital interfaces and physical media.
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Deliverables</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Core Brand Assets",
              "Color System",
              "Typography System",
              "IGraphic Elements",
              "Brand Guidelines",
              "Visual Language"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-rose-500 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Info */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Role</span>
            <p className="text-lg font-medium mt-2">Graphic Designer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">1/2 Days</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <p className="text-lg font-medium mt-2">Photoshop, Illustrator</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Year</span>
            <p className="text-lg font-medium mt-2">2025</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Identity;
