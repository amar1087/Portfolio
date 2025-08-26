import { useQuery } from "@tanstack/react-query";
import { User, MapPin, Award } from "lucide-react";
import type { ContactInfo } from "@shared/schema";

export default function HeroSection() {
  const { data: contactInfo, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (isLoading) {
    return (
      <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-16 bg-slate-200 rounded mb-6"></div>
            <div className="h-8 bg-slate-200 rounded mb-4"></div>
            <div className="h-8 bg-slate-200 rounded mb-8"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!contactInfo) {
    return (
      <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-red-600">Unable to load contact information. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 fade-in">
              AI Solutions Consultant &
              <span className="text-primary"> Full Stack Developer</span>
            </h1>
            <p className="text-xl text-secondary mb-8 leading-relaxed fade-in">
              {contactInfo.bio}
            </p>
            <div className="grid sm:grid-cols-2 gap-6 mb-8 fade-in">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">AI & Cloud Expertise</h3>
                <p className="text-sm text-secondary">
                  OpenAI SDK, CrewAI, LangGraph, AutoGen, AWS Cloud Architecture
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="font-semibold text-slate-900 mb-2">Full Stack Mastery</h3>
                <p className="text-sm text-secondary">
                  Angular, React, Node.js, TypeScript, Mobile Development
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 fade-in">
              <button
                onClick={() => handleNavClick("contact")}
                className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                data-testid="button-get-in-touch"
              >
                Get In Touch
              </button>
              <button
                onClick={() => handleNavClick("projects")}
                className="border border-slate-300 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
                data-testid="button-view-projects"
              >
                View Projects
              </button>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
              <div className="w-48 h-48 mx-auto bg-white rounded-full shadow-lg flex items-center justify-center mb-6">
                <User className="w-24 h-24 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Based in {contactInfo.location}
              </h3>
              <p className="text-secondary mb-4">Open to Remote Opportunities</p>
              <div className="text-sm text-slate-600">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className="w-4 h-4" />
                  <span>AWS Certified Solution Architect</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>15+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
