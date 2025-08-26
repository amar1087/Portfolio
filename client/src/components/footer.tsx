
export default function Footer() {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Amarjeet Kaur</h3>
            <p className="text-slate-400 mb-4">
              Senior Full Stack Developer & Cloud Architect specializing in scalable web applications
              and enterprise solutions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              {[
                { id: "about", label: "About" },
                { id: "experience", label: "Experience" },
                { id: "skills", label: "Skills" },
                { id: "projects", label: "Projects" },
                { id: "contact", label: "Contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="hover:text-white transition-colors text-left"
                    data-testid={`footer-nav-${item.id}`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Specializations</h4>
            <ul className="space-y-2 text-slate-400">
              <li>Full Stack Development</li>
              <li>AWS Cloud Architecture</li>
              <li>Mobile Applications</li>
              <li>Enterprise Solutions</li>
              <li>Performance Optimization</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">&copy; 2025 Amarjeet Kaur. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
