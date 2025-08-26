import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Building } from "lucide-react";
import type { PortfolioData } from "@shared/schema";

export default function ExperienceSection() {
  const { data: experiences, isLoading } = useQuery<PortfolioData[]>({
    queryKey: ["/api/portfolio/experience"],
  });

  if (isLoading) {
    return (
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-48 mx-auto animate-pulse"></div>
          </div>
          <div className="space-y-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl p-8 border border-slate-200 animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Unable to load experience data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Work Experience
          </h2>
          <p className="text-xl text-secondary">15+ years of professional development experience</p>
        </div>

        <div className="space-y-12 fade-in">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-slate-50 rounded-xl p-8 border border-slate-200"
              data-testid={`experience-${experience.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-4 h-4 text-primary" />
                    <p className="text-lg text-primary font-medium">{experience.company}</p>
                  </div>
                  {experience.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <p className="text-secondary">{experience.location}</p>
                    </div>
                  )}
                </div>
                <div className="text-right mt-4 lg:mt-0">
                  <div className="flex items-center gap-2 justify-end">
                    <Calendar className="w-4 h-4 text-secondary" />
                    <p className="text-secondary font-medium">
                      {experience.startDate} - {experience.endDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-2 py-1 rounded text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Achievements */}
              {experience.achievements && experience.achievements.length > 0 && (
                <div className="prose prose-slate max-w-none">
                  <ul className="space-y-3 text-secondary">
                    {experience.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
