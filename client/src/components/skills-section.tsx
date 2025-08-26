import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import type { PortfolioData } from "@shared/schema";

export default function SkillsSection() {
  const { data: skills, isLoading } = useQuery<PortfolioData[]>({
    queryKey: ["/api/portfolio/skill"],
  });

  if (isLoading) {
    return (
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!skills || skills.length === 0) {
    return (
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Unable to load skills data. Please try again later.</p>
        </div>
      </section>
    );
  }

  const primarySkills = skills.filter(skill => skill.category === 'primary');
  const cloudSkills = skills.filter(skill => skill.category === 'cloud');
  const toolSkills = skills.filter(skill => skill.category === 'tools');

  return (
    <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Technical Expertise
          </h2>
          <p className="text-xl text-secondary">Core technologies and frameworks I work with</p>
        </div>

        {/* Primary Skills Interactive Tiles */}
        <div className="mb-16 fade-in">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Primary Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {primarySkills.map((skill) => (
              <div
                key={skill.id}
                className="skill-tile bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:transform hover:-translate-y-1"
                data-testid={`skill-tile-${skill.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-medium text-slate-900 text-sm">{skill.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Secondary Skills Categorized */}
        <div className="grid md:grid-cols-2 gap-8 fade-in">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">Cloud & AWS</h4>
            <div className="flex flex-wrap gap-2">
              {cloudSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-block bg-accent text-slate-700 px-3 py-1 rounded-full text-sm"
                  data-testid={`cloud-skill-${skill.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-4">Development Tools & Frameworks</h4>
            <div className="flex flex-wrap gap-2">
              {toolSkills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-block bg-accent text-slate-700 px-3 py-1 rounded-full text-sm"
                  data-testid={`tool-skill-${skill.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {skill.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
