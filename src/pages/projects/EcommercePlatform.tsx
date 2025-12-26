import { ArrowLeft, ShoppingCart, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EcommercePlatform = () => {
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
              <ShoppingCart className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <span className="text-amber-500 text-sm font-medium uppercase tracking-widest">Web Design</span>
              <h1 className="text-4xl md:text-6xl font-bold mt-2">E-commerce Platform</h1>
            </div>
          </div>
          
          <p className="text-xl text-muted-foreground max-w-2xl">
            A premium e-commerce experience designed to maximize conversions while delivering an elegant, seamless shopping journey from browse to checkout.
          </p>
        </div>
      </section>

      {/* Project Visual */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="aspect-video rounded-3xl bg-gradient-to-br from-amber-500/30 to-amber-500/5 flex items-center justify-center overflow-hidden relative">
            <div className="absolute w-52 h-52 rounded-md bg-foreground/5 animate-float" style={{ top: '12%', left: '58%' }} />
            <div className="absolute w-32 h-32 rounded-full bg-foreground/10 animate-float" style={{ top: '48%', left: '22%', animationDelay: '0.5s' }} />
            <div className="absolute w-28 h-28 rounded-lg bg-foreground/5 animate-float" style={{ top: '28%', left: '42%', animationDelay: '1s' }} />
            <ShoppingCart className="w-32 h-32 text-foreground/40" />
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              Design a high-converting e-commerce platform that balances aesthetic appeal with functionality, supporting thousands of products while maintaining fast load times and intuitive navigation.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-6">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              A minimalist design approach with strategic use of whitespace, intuitive filtering, quick-view modals, and a streamlined checkout flow that reduced cart abandonment by 35%.
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
              "Advanced product filtering",
              "Quick-view product modals",
              "Seamless checkout flow",
              "Wishlist & save for later",
              "Size & fit recommendations",
              "Real-time inventory updates"
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
            <p className="text-lg font-medium mt-2">UX/UI Designer</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Timeline</span>
            <p className="text-lg font-medium mt-2">4 Months</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground uppercase tracking-widest">Tools</span>
            <p className="text-lg font-medium mt-2">Figma, Webflow</p>
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

export default EcommercePlatform;
