import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    color: "from-accent/40 to-accent/10",
  },
  {
    id: 2,
    title: "Brand Identity System",
    category: "Graphic Design",
    color: "from-rose-500/30 to-rose-500/5",
  },
  {
    id: 3,
    title: "E-commerce Platform",
    category: "Web Design",
    color: "from-amber-500/30 to-amber-500/5",
  },
  {
    id: 4,
    title: "Mobile App Design",
    category: "UI/UX Design",
    color: "from-violet-500/30 to-violet-500/5",
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <span className="text-accent text-sm font-medium uppercase tracking-widest">Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Selected works
            </h2>
          </div>
          <p className="text-muted-foreground mt-4 md:mt-0 max-w-md">
            A curated collection of projects showcasing my design thinking and creative problem-solving.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer hover-lift"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />
              
              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                    {project.category}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
                </div>
              </div>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
