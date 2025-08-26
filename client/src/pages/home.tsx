import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SkillsSection from "@/components/skills-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import EducationCertifications from "@/components/education-certifications";
import ChatbotPlaceholder from "@/components/chatbot-placeholder";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="font-sans bg-slate-50 text-slate-800">
      <Navigation />
      <HeroSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <EducationCertifications />
      <ChatbotPlaceholder />
      <ContactSection />
      <Footer />
    </div>
  );
}
