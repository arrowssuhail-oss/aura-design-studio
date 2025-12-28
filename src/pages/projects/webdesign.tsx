import { ArrowLeft, PanelsTopLeft, CheckCircle, Code } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/antigravity-hero.png";

const WebDesign = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 flex items-center justify-center">
              <PanelsTopLeft className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <span className="text-amber-500 text-sm font-medium uppercase tracking-widest">Web Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">AntiGravity</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Seamless navigation. Elegant design. Effortless checkout." Best for: Clean, modern web layouts where the visuals speak for themselves.
          </p>
          <span className="text-amber-500 text-sm font-medium uppercase tracking-widest block mt-6">Created Web Design</span>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">

        <div className="max-w-6xl mx-auto">
          <a
            href="https://www.arrowsdesigns.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block aspect-video rounded-3xl bg-muted overflow-hidden relative group cursor-pointer"
          >
            <img
              src={heroImage}
              alt="AntiGravity Project Hero"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              The goal was to build a high-converting platform that balances premium aesthetics with the technical capacity to support thousands of products. The architecture focuses on maintaining lightning-fast performance and intuitive navigation despite a vast inventory.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              A minimalist approach using strategic whitespace, intuitive filtering, and quick-view modals was implemented to simplify the shopping experience. This streamlined design successfully optimized the checkout flow, resulting in a 35% reduction in cart abandonment.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="px-6 py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "Icon or Illustration",
              "Descriptive Text",
              "Call to Action",
              "Lead with Benefits",
              "Maintain Visual Hierarchy",
              "Mobile Responsiveness"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-amber-500 mt-0.5" />
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
            <p className="text-lg font-medium mt-2">Designer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">2 Months</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://antigravity.google/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/google-antigravity-ai-logo-hd.png" alt="Antigravity" className="w-6 h-6 object-contain" />
              </a>
              <a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                <img src="/vscode.png" alt="VSCode" className="w-6 h-6 object-contain" />
              </a>
            </div>
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

export default WebDesign;
