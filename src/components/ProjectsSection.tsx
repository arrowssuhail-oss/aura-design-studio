import { ArrowUpRight, BarChart3, Palette, PanelsTopLeft, Smartphone, MonitorSmartphone } from "lucide-react";
import { Link } from "react-router-dom";

const projects = [
  {
    id: 1,
    title: "Custom & Unique Identity",
    category: "Graphic Design",
    color: "from-rose-500/30 to-rose-500/5",
    icon: Palette,
    shapes: ["rounded-full", "rounded-lg", "rounded-full"],
    link: "/projects/brand-identity",
  },
  {
    id: 2,
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    color: "from-accent/40 to-accent/10",
    icon: BarChart3,
    shapes: ["rounded-lg", "rounded-full", "rounded-md"],
    link: "/projects/fintech-dashboard",
  },
  {
    id: 3,
    title: "Antigravity",
    category: "Web Design",
    color: "from-amber-500/30 to-amber-500/5",
    icon: PanelsTopLeft,
    shapes: ["rounded-md", "rounded-full", "rounded-lg"],
    link: "/projects/ecommerce-platform",
  },
  {
    id: 4,
    title: "Video Editing",
    category: "Edited Videos",
    color: "from-violet-500/30 to-violet-500/5",
    icon: Smartphone,
    shapes: ["rounded-2xl", "rounded-lg", "rounded-full"],
    link: "/projects/mobile-app-design",
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
              Works
            </h2>
            <span className="text-accent text-sm font-medium uppercase tracking-widest">Completed Projects</span>
          </div>
          <p className="text-muted-foreground mt-4 md:mt-0 max-w-md">
            A Curated Collection of Projects Showcasing My Design Thinking and creative problem-solving.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-up-scroll">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={project.link}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer hover-lift block"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
