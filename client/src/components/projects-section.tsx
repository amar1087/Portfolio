import { useQuery } from "@tanstack/react-query";
import { BarChart3, Smartphone, Zap, Building2, Heart, Database } from "lucide-react";
import type { PortfolioData } from "@shared/schema";

const projectIcons = {
  'Multi-language Dashboard Systems': BarChart3,
  'Real-time Analytics Platform': BarChart3,
  'Enterprise Mobile Applications': Smartphone,
  'Performance Optimization': Zap,
  'Smart City Solutions': Building2,
  'EPDS System': Database,
};

export default function ProjectsSection() {
  const { data: projects, isLoading } = useQuery<PortfolioData[]>({
    queryKey: ["/api/portfolio/project"],
  });

  if (isLoading) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
                <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                <div className="h-16 bg-slate-200 rounded mb-4"></div>
                <div className="flex flex-wrap gap-2">
                  <div className="h-6 bg-slate-200 rounded w-16"></div>
                  <div className="h-6 bg-slate-200 rounded w-12"></div>
                  <div className="h-6 bg-slate-200 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Unable to load projects data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-secondary">Key achievements and successful implementations</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in">
          {projects.map((project) => {
            const IconComponent = projectIcons[project.title as keyof typeof projectIcons] || Heart;
            
            return (
              <div
                key={project.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                data-testid={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{project.title}</h3>
                <p className="text-secondary mb-4">{project.description}</p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="bg-accent text-slate-700 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
