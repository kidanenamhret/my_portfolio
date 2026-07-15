import { useState } from 'react';
import './design.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import ConsolePanel from './components/ui/ConsolePanel';
import { useSimulatedBackend } from './hooks/useSimulatedBackend';

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const backend = useSimulatedBackend();

  const handleSocialClick = (name, url) => {
    backend.addLog(`GET /api/track - 200 OK - { social: "${name}" }`, 'info');
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleProjectClick = (e, projectName, type, url) => {
    e.preventDefault();
    window.open(url, '_blank', 'noopener,noreferrer');
    backend.addLog(`GET /api/project-click - 200 OK - { project: "${projectName}", type: "${type}" }`, 'info');
    backend.setTemporaryStatus(`redirecting to ${type}...`, '#5ae9aa');
  };

  return (
    <div className={`portfolio-app ${isLightTheme ? 'light-theme' : ''}`}>
      <Header
        isLightTheme={isLightTheme}
        setIsLightTheme={setIsLightTheme}
        onSocialClick={handleSocialClick}
      />

      <main>
        <Hero />
        <hr className="section-divider container" />
        <Skills />
        <hr className="section-divider container" />
        <Projects onProjectClick={handleProjectClick} />

        {/* Contact Section */}
        <section className="contact" id="contact">
          <div className="contact-container container">
            <div className="contact-info">
              <h2 className="contact-title">Contact</h2>
              <p className="contact-desc">
                I would love to hear about your project and how I can help. Please feel free to get in touch using the button on the right.
              </p>
            </div>
            <div className="contact-action">
              <a
                href="mailto:mesfin6323@gmail.com"
                className="btn-outline"
                aria-label="Send email to Mesfin"
              >
                <i className="bx bx-envelope"></i> Email Me
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer onSocialClick={handleSocialClick} />
      <ConsolePanel backend={backend} />
    </div>
  );
}

export default App;
