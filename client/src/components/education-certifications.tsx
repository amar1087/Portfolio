import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Award } from "lucide-react";
import type { PortfolioData } from "@shared/schema";

export default function EducationCertifications() {
  const { data: certifications, isLoading } = useQuery<PortfolioData[]>({
    queryKey: ["/api/portfolio/certification"],
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-32 mb-8"></div>
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-5 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-40 mb-8"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!certifications || certifications.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Unable to load certifications data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="fade-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              Education
            </h2>
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Bachelor of Technology
              </h3>
              <p className="text-lg text-primary font-medium mb-2">Computer Science</p>
              <p className="text-secondary mb-2">Uttar Pradesh Technical University</p>
              <p className="text-secondary">2004-09 - 2008-07</p>
            </div>
          </div>

          <div className="fade-in">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Certifications
            </h2>
            <div className="space-y-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-50 rounded-xl p-6 border border-slate-200"
                  data-testid={`certification-${cert.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{cert.title}</h3>
                  {cert.company && (
                    <p className="text-secondary mb-1">{cert.company}</p>
                  )}
                  {cert.endDate && (
                    <p className="text-secondary text-sm">{cert.endDate}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
