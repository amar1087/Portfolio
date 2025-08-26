import { useQuery } from "@tanstack/react-query";
import { Mail, Linkedin, Globe, MapPin, CheckCircle } from "lucide-react";
import type { ContactInfo } from "@shared/schema";

export default function ContactSection() {
  const { data: contactInfo, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact"],
  });

  if (isLoading) {
    return (
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-slate-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-32 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-slate-200 rounded-lg"></div>
                    <div>
                      <div className="h-4 bg-slate-200 rounded w-16 mb-1"></div>
                      <div className="h-4 bg-slate-200 rounded w-32"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-40 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-slate-200 rounded-full mt-1"></div>
                    <div>
                      <div className="h-4 bg-slate-200 rounded w-32 mb-1"></div>
                      <div className="h-3 bg-slate-200 rounded w-48"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!contactInfo) {
    return (
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-red-600">Unable to load contact information. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h2>
          <p className="text-xl text-secondary">Ready to collaborate on your next AI-powered project</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 fade-in">
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Get In Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Email</p>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-primary hover:text-blue-700"
                    data-testid="contact-email"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
              
              {contactInfo.linkedin && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">LinkedIn</p>
                    <a
                      href={contactInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-700"
                      data-testid="contact-linkedin"
                    >
                      linkedin.com/in/amarjeet-kaur-1087
                    </a>
                  </div>
                </div>
              )}

              {contactInfo.website && (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Website</p>
                    <a
                      href={contactInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-blue-700"
                      data-testid="contact-website"
                    >
                      amarjeetkaur.com
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">Location</p>
                  <p className="text-secondary">{contactInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-6">What I Can Help With</h3>
            <div className="space-y-4">
              {[
                {
                  title: "AI Agent Development",
                  description: "Custom AI solutions using CrewAI, LangGraph, and AutoGen",
                },
                {
                  title: "Full Stack Development",
                  description: "Angular, React, Node.js applications with AWS deployment",
                },
                {
                  title: "Cloud Architecture",
                  description: "AWS solutions design and implementation",
                },
                {
                  title: "Mobile Applications",
                  description: "Cross-platform mobile development and optimization",
                },
              ].map((service, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-3 h-3 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{service.title}</p>
                    <p className="text-sm text-secondary">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
