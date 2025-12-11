const AboutSection = () => {
  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl bg-gradient-to-br from-accent/20 via-muted to-secondary overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-accent/30 animate-pulse-slow" />
              </div>
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 glass-card p-6 max-w-[240px]">
              <p className="text-3xl font-bold gradient-text mb-1">5+</p>
              <p className="text-sm text-muted-foreground">Years crafting digital experiences</p>
            </div>
          </div>
          
          {/* Content side */}
          <div>
            <span className="text-accent text-sm font-medium uppercase tracking-widest">About Me</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-8">
              Designing with purpose & precision
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a multi-disciplinary designer based in San Francisco, passionate about creating 
                digital experiences that are both beautiful and functional. My approach combines 
                strategic thinking with meticulous attention to detail.
              </p>
              <p>
                With expertise spanning UI/UX design, brand identity, and motion graphics, I help 
                startups and established brands transform their ideas into compelling visual stories 
                that resonate with their audiences.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-border">
              <p className="text-lg italic text-foreground/80">
                "Design is not just what it looks like — it's how it works."
              </p>
              <p className="text-sm text-muted-foreground mt-2">— My design philosophy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
