import { ArrowLeft, MonitorSmartphone, CheckCircle, Download } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const MobileAppDesign = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-violet-500/20 flex items-center justify-center">
              <MonitorSmartphone className="w-8 h-8 text-violet-500" />
            </div>
            <div>
              <span className="text-violet-500 text-sm font-medium uppercase tracking-widest">Video Editing</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">Video Editing</h1>
            </div>
          </div>

          <p className="text-xl text-muted-foreground max-w-2xl">
            A video editing app designed to help users build creative projects through gentle guidance, export tracking, and personalized template recommendations.
          </p>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-violet-500/30 to-violet-500/5 flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-44 h-44 rounded-2xl bg-foreground/5 animate-float" style={{ top: '18%', left: '62%' }} />
            <div className="absolute w-36 h-36 rounded-lg bg-foreground/10 animate-float" style={{ top: '52%', left: '18%', animationDelay: '0.5s' }} />
            <div className="absolute w-24 h-24 rounded-full bg-foreground/5 animate-float" style={{ top: '32%', left: '38%', animationDelay: '1s' }} />
            <MonitorSmartphone className="w-32 h-32 text-foreground/40" />
          </div>

          <div className="flex justify-center mt-12">
            <Link to="/payments">
              <Button variant="accent" size="lg" className="rounded-full px-8 group shadow-lg shadow-violet-500/20">
                <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-1" />
                Download Video
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Create a high-performance, intuitive desktop experience that encourages deep creative flow without feeling overwhelming, while making complex post-production workflows accessible and actionable.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              A modern, streamlined interface with customizable workspaces, responsive real-time previews, and intelligent shortcuts that guide users through the editing process with precision and speed.
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
              "Multi-track timeline editing",
              "Real-time color correction",
              "Advanced transition engine",
              "Smart proxy management",
              "Dynamic template library",
              "High-bitrate export engine"
            ].map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-violet-500 mt-0.5" />
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
            <p className="text-lg font-medium mt-2">Video Editor</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">1/2 Days</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <p className="text-lg font-medium mt-2">Premiere Pro, After Effects</p>
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

export default MobileAppDesign;
