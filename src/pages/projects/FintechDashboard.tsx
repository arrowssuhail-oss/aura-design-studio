import { ArrowLeft, BarChart3, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FintechDashboard = () => {
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
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center">
              <BarChart3 className="w-8 h-8 text-accent" />
            </div>
            <div>
              <span className="text-accent text-sm font-medium uppercase tracking-widest">UI/UX Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">Fintech Dashboard</h1>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            A comprehensive financial management dashboard designed to help users track investments, analyze spending patterns, and make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-accent/40 to-accent/10 flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-64 h-64 rounded-lg bg-foreground/5 animate-float" style={{ top: '10%', left: '60%' }} />
            <div className="absolute w-40 h-40 rounded-full bg-foreground/10 animate-float" style={{ top: '50%', left: '20%', animationDelay: '0.5s' }} />
            <div className="absolute w-32 h-32 rounded-md bg-foreground/5 animate-float" style={{ top: '30%', left: '40%', animationDelay: '1s' }} />
            <BarChart3 className="w-32 h-32 text-foreground/40" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Create an intuitive dashboard that simplifies complex financial data while maintaining accuracy and providing actionable insights for everyday users and financial professionals alike.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              A clean, modular interface with customizable widgets, real-time data visualization, and smart notifications that keep users informed without overwhelming them.
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
              "Real-time portfolio tracking",
              "Customizable dashboard widgets",
              "Advanced analytics & reporting",
              "Smart spending insights",
              "Goal-based savings tracker",
              "Multi-currency support"
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
            <p className="text-lg font-medium mt-2">Lead Designer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">3 Months</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <p className="text-lg font-medium mt-2">Figma, Framer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Year</span>
            <p className="text-lg font-medium mt-2">2024</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FintechDashboard;
