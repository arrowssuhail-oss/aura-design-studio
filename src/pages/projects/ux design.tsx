import { ArrowLeft, ChartNoAxesGantt, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const HumanCenteredDesign = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Link to="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <ChartNoAxesGantt className="w-8 h-8 text-accent" />
            </div>
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-widest">UI/UX Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">Human Centered Design</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            Transforming conceptual ideas into functional digital products using Figma for precise design systems and WordPress for responsive, live web solutions.
          </p>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-64 h-64 rounded-lg bg-foreground/5 animate-float" style={{ top: '10%', left: '60%' }} />
            <div className="absolute w-40 h-40 rounded-full bg-foreground/10 animate-float" style={{ top: '50%', left: '20%', animationDelay: '0.5s' }} />
            <div className="absolute w-32 h-32 rounded-md bg-foreground/5 animate-float" style={{ top: '30%', left: '40%', animationDelay: '1s' }} />
            <ChartNoAxesGantt className="w-32 h-32 text-foreground/40" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Bridging the gap between complex business requirements and user needs while maintaining a clean, accessible interface.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              Applying a user-centered design process to create modular, responsive interfaces that simplify navigation and improve overall digital interactions.
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
              "User Research & Analysis",
              "Wireframing & Prototyping",
              "Responsive Web Design",
              "Visual Design Systems",
              "Interactive UI Elements",
              "Replace the Checkmarks"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5" />
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
            <p className="text-lg font-medium mt-2">Product Designer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">2 Months</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <p className="text-lg font-medium mt-2">Figma, WordPress</p>
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

export default HumanCenteredDesign;
