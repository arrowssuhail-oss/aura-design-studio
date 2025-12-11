import { Palette, Layout, Play, Figma, PenTool, Monitor, Layers, Sparkles } from "lucide-react";

const skills = [
  { name: "UI/UX Design", icon: Layout, description: "User-centered interfaces" },
  { name: "Graphic Design", icon: Palette, description: "Visual brand identity" },
  { name: "Motion Design", icon: Play, description: "Engaging animations" },
  { name: "Figma", icon: Figma, description: "Design & prototyping" },
  { name: "Illustration", icon: PenTool, description: "Custom graphics" },
  { name: "Web Design", icon: Monitor, description: "Responsive layouts" },
  { name: "Design Systems", icon: Layers, description: "Scalable components" },
  { name: "AI Tools", icon: Sparkles, description: "Modern workflows" },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-gradient-to-b from-transparent via-muted/30 to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-accent text-sm font-medium uppercase tracking-widest">Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Tools & expertise
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass-card p-6 hover-lift group cursor-default"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <skill.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">{skill.name}</h3>
              <p className="text-sm text-muted-foreground">{skill.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
