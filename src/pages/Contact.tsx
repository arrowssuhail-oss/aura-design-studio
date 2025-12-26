import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Linkedin, Twitter, Dribbble, Github, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const socials = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Dribbble, href: "#", label: "Dribbble" },
  { icon: Github, href: "#", label: "GitHub" },
];

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 px-6 py-12">
        {/* Back button */}
        <div className="max-w-4xl mx-auto mb-8">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-accent text-sm font-medium uppercase tracking-widest">Let's Talk</span>
            <h1 className="text-4xl md:text-6xl font-bold mt-4 bg-gradient-to-r from-foreground via-foreground to-accent bg-clip-text text-transparent">
              Start a Conversation
            </h1>
            <p className="text-muted-foreground mt-6 max-w-lg mx-auto text-lg">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing together.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6 hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-semibold text-lg">hello@alexmorgan.com</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 hover:border-accent/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-lg">San Francisco, CA</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-6">
                <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
                <div className="flex gap-3">
                  {socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-muted hover:bg-accent/20 flex items-center justify-center transition-all group hover:scale-105"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 bg-accent/5 border-accent/20">
                <p className="text-sm font-medium text-accent mb-2">Available for freelance</p>
                <p className="text-muted-foreground text-sm">
                  I'm currently accepting new projects. Let's discuss how I can help bring your vision to life.
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-background/50 border-border/50 rounded-xl h-12"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-background/50 border-border/50 rounded-xl h-12"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="bg-background/50 border-border/50 rounded-xl min-h-[180px] resize-none"
                    required
                  />
                </div>
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
