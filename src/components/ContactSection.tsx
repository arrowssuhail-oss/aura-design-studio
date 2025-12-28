import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Send, Linkedin, Palette, Instagram, Link } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const socials = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/suhailbinsaidalavi/", label: "LinkedIn" },
  { icon: Palette, href: "https://www.behance.net/ArrowsSuhail", label: "Adobe Behance" },
  { icon: Instagram, href: "https://www.instagram.com/arrows.in_/", label: "Instagram" },
  { icon: Link, href: "https://linktr.ee/arrows.suhail?utm_source=linktree_profile_share&ltsid=e2729df1-4401-42a8-b1e9-c9f141fda649", label: "Linktree" },
];

const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Construct Gmail URL
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\r\n\r\nFrom: ${formData.name} (${formData.email})`);

    // Open Gmail in a new tab
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=arrows.suhail@gmail.com&su=${subject}&body=${body}`, '_blank');

    toast({
      title: "Opening Gmail...",
      description: "Please send the pre-filled email to complete your message.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium uppercase tracking-widest">Contact</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Let's work together
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 animate-fade-up-scroll">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">arrows.suhail@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">Malappuram, Kerala</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-4">Connect with me</p>
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-muted hover:bg-accent/10 flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                  </a>
                ))}
              </div>
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
                  className="bg-background/50 border-border/50 rounded-xl min-h-[150px] resize-none"
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
    </section>
  );
};

export default ContactSection;
