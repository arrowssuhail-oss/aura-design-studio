import { ArrowUpRight, BarChart3, Palette, PanelsTopLeft, Smartphone, ChartNoAxesGantt } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

const projects = [
  {
    id: 1,
    title: "Custom & Unique Identity",
    category: "Graphic Design",
    color: "from-rose-500/30 to-rose-500/5",
    icon: Palette,
    shapes: ["rounded-full", "rounded-lg", "rounded-full"],
    link: "/projects/identity",
  },
  {
    id: 2,
    title: "Human Centered Design",
    category: "UI/UX Design",
    color: "from-accent/40 to-accent/10",
    icon: ChartNoAxesGantt,
    shapes: ["rounded-lg", "rounded-full", "rounded-md"],
    link: "/projects/ui-ux-design",
  },
  {
    id: 3,
    title: "Antigravity",
    category: "Web Design",
    color: "from-amber-500/30 to-amber-500/5",
    icon: PanelsTopLeft,
    shapes: ["rounded-md", "rounded-full", "rounded-lg"],
    link: "/projects/webdesign",
  },
  {
    id: 4,
    title: "Video Editing",
    category: "Edited Videos",
    color: "from-violet-500/30 to-violet-500/5",
    icon: Smartphone,
    shapes: ["rounded-2xl", "rounded-lg", "rounded-full"],
    link: "/projects/video-editing",
  },
];

const ProjectCard = ({ project }: { project: typeof projects[0] }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    // Calculate rotation values (scale down for subtle effect)
    // Rotate Y based on X position, Rotate X based on Y position (inverted)
    const rotateY = (x / width) * 20; // Max 10 deg rotation
    const rotateX = -(y / height) * 20; // Max 10 deg rotation

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovering(false);
  };

  return (
    <Link
      ref={cardRef}
      to={project.link}
      className="group relative aspect-[4/3] rounded-3xl overflow-hidden cursor-pointer hover-lift block animate-flip-in-scroll"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1}, ${isHovering ? 1.02 : 1})`,
        transition: 'transform 0.1s ease-out'
      }}
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

      {/* Decorative shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {project.shapes.map((shape, index) => (
          <div
            key={index}
            className={`absolute bg-white/5 backdrop-blur-sm border border-white/10 ${shape} animate-float`}
            style={{
              width: index === 0 ? '120px' : index === 1 ? '80px' : '60px',
              height: index === 0 ? '120px' : index === 1 ? '80px' : '60px',
              top: index === 0 ? '-10%' : index === 1 ? '40%' : 'auto',
              right: index === 0 ? '-5%' : 'auto',
              left: index === 0 ? 'auto' : index === 1 ? '-5%' : '80%',
              bottom: index === 2 ? '10%' : 'auto',
              animationDelay: `${index * 1.5}s`,
              animationDuration: `${6 + index * 2}s`
            }}
          />
        ))}
      </div>

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

        <div style={{
          transform: `translateZ(50px)`,
          transformStyle: 'preserve-3d'
        }}>
          <h3 className="text-2xl md:text-3xl font-bold">{project.title}</h3>
        </div>

        {/* Floating Icon */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <project.icon
            className="w-24 h-24 text-white/10 rotate-12 transform group-hover:animate-[popIn_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]"
            strokeWidth={1.5}
          />
        </div>
      </div>

      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

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

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
