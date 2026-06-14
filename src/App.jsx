import { useState, useEffect } from 'react';
import './design.css';

function App() {
  // Reactive stats (synced with console log widget)
  const [likes, setLikes] = useState(64);
  const [messages, setMessages] = useState(23);
  const [shares, setShares] = useState(15);
  const [statusMsg, setStatusMsg] = useState('online · ready to connect');
  const [msgStyle, setMsgStyle] = useState('#4ee1a0');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Projects database (retained from original file)
  const projects = [
    {
      name: 'Ethio Farmers Market',
      badge: 'Hosted',
      desc: 'A localized e‑commerce platform designed to bridge the gap between Ethiopian farmers and consumers. Features role‑based user/admin access, interactive inventory CRUD, order management, and AJAX live search.',
      tech: [
        { name: 'PHP', icon: 'bxl-php', color: '#777bb4' },
        { name: 'MySQL', icon: 'bx-data', color: '#00758f' },
        { name: 'JavaScript', icon: 'bxl-javascript', color: '#f7df1e' },
        { name: 'CSS3', icon: 'bxl-css3', color: '#1572b6' }
      ],
      gradient: 'linear-gradient(135deg, #1d4a2b, #4a7c59)',
      demoUrl: 'http://localhost/Ethio-Farmers_Market/public/index.php',
      codeUrl: 'https://github.com/mesfine/ethio-farmers-market'
    },
    {
      name: 'Tade Campus Event',
      badge: 'Desktop App',
      desc: 'A desktop Campus Event Management System with robust role governance (Admin/User), SQLite database configuration, alerts management, and view transition control.',
      tech: [
        { name: 'Java', icon: 'bxl-java', color: '#f89820' },
        { name: 'JavaFX', icon: 'bx-desktop', color: '#5382a1' },
        { name: 'SQLite', icon: 'bx-data', color: '#003b57' }
      ],
      gradient: 'linear-gradient(135deg, #1e3c72, #2a5298)',
      demoUrl: 'https://github.com/mesfine/tade-campus/releases',
      codeUrl: 'https://github.com/mesfine/tade-campus'
    },
    {
      name: 'Simple Calculator',
      badge: 'Vanilla JS',
      desc: 'A fast and clean browser‑based calculator implementing standard algebraic calculations and a sleek responsive interactive display.',
      tech: [
        { name: 'JavaScript', icon: 'bxl-javascript', color: '#f7df1e' },
        { name: 'HTML5', icon: 'bxl-html5', color: '#e34f26' },
        { name: 'CSS3', icon: 'bxl-css3', color: '#1572b6' }
      ],
      gradient: 'linear-gradient(135deg, #f12711, #f5af19)',
      demoUrl: 'http://localhost/calculator',
      codeUrl: 'https://github.com/mesfine/simple-calculator'
    },
    {
      name: 'Mesfine Portfolio (Vercel)',
      badge: 'Live Demo',
      desc: 'My personal portfolio showcasing projects, tech stack, and interactive UI built with React and Vite.',
      tech: [
        { name: 'React', icon: 'bxl-react', color: '#61dafb' },
        { name: 'Vite', icon: 'bxl-vite', color: '#ffd62e' },
        { name: 'CSS3', icon: 'bxl-css3', color: '#1572b6' }
      ],
      gradient: 'linear-gradient(135deg, #0f2027, #203a43)',
      demoUrl: 'http://mesfina6305.infinityfreeapp.com/',
      codeUrl: 'https://github.com/mesfine/portfolio'
    },
    {
      name: 'Mesfin Blog (InfinityFree)',
      badge: 'Live Site',
      desc: 'A blog platform hosting articles about development, tech trends, and personal stories.',
      tech: [
        { name: 'PHP', icon: 'bxl-php', color: '#777bb4' },
        { name: 'MySQL', icon: 'bx-data', color: '#00758f' },
        { name: 'Bootstrap', icon: 'bxl-bootstrap', color: '#7952b3' }
      ],
      gradient: 'linear-gradient(135deg, #ff512f, #dd2476)',
      demoUrl: 'http://mesfina6305.infinityfreeapp.com/',
      codeUrl: 'https://github.com/mesfine/blog'
    }
  ];

  const filterTags = ['All', 'PHP', 'MySQL', 'Java', 'JavaFX', 'SQLite', 'JavaScript', 'React'];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.tech.some(t => t.name === selectedTech);
    return matchesSearch && matchesTech;
  });

  const socials = [
    { icon: 'bxl-github', aria: 'github', url: 'https://github.com/mesfine' },
    { icon: 'bx-code-alt', aria: 'frontend-mentor', url: 'https://www.frontendmentor.io' },
    { icon: 'bxl-linkedin', aria: 'linkedin', url: 'https://linkedin.com' },
    { icon: 'bxl-twitter', aria: 'twitter', url: 'https://twitter.com' }
  ];

  // Helper to append server-style logs
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setConsoleLogs(prev => [...prev, { time, message, type }]);
  };

  const setTemporaryStatus = (text, color = '#4ee1a0') => {
    setStatusMsg(text);
    setMsgStyle(color);
    setTimeout(() => {
      setStatusMsg('online · ready to connect');
      setMsgStyle('#4ee1a0');
    }, 2500);
  };

  const handleHire = () => {
    addLog('POST /api/hire - 200 OK - { dev: "Mesfine" }', 'success');
    setLikes(l => l + 1);
    setTemporaryStatus('hiring request sent', '#4ee1a0');
  };

  const handleMessage = () => {
    addLog('POST /api/message - 200 OK - { to: "Mesfine" }', 'success');
    addLog('Socket.io - client message dispatched', 'info');
    setMessages(m => m + 1);
    setTemporaryStatus('message delivered', '#4ee1a0');
  };

  const handleNodeRun = () => {
    addLog('System - starting server middleware process...', 'warn');
    setTimeout(() => {
      addLog('Express - CORS middleware checks passed', 'info');
      addLog('Express - static path distribution active', 'success');
      setShares(s => s + 1);
      setTemporaryStatus('server middleware active', '#4ee1a0');
    }, 500);
  };

  const handleSocialClick = (name, url) => {
    addLog(`GET /api/track - 200 OK - { social: "${name}" }`, 'info');
    window.open(url, '_blank');
  };

  const handleProjectClick = (e, projectName, type, url) => {
    e.preventDefault();
    addLog(`GET /api/project-click - 200 OK - { project: "${projectName}", type: "${type}" }`, 'info');
    setTemporaryStatus(`redirecting to ${type}...`, '#5ae9aa');
    setTimeout(() => {
      window.open(url, '_blank');
    }, 500);
  };

  // Log initial connection on startup
  useEffect(() => {
    addLog('System - connecting to simulated Node.js backend...', 'info');
    setTimeout(() => {
      addLog('Express - server running on port 5000', 'success');
      addLog('MongoDB - database state connected', 'success');
    }, 600);
  }, []);

  return (
    <div className="portfolio-app">
      {/* Header Container */}
      <header className="header container">
        <div className="logo">Mesfine</div>
        <nav className="socials">
          {socials.map((s, idx) => (
            <button
              key={idx}
              className="social-link"
              onClick={() => handleSocialClick(s.aria, s.url)}
              aria-label={s.aria}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <i className={`bx ${s.icon}`}></i>
            </button>
          ))}
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero container">
          <h1 className="hero-title">
            Hello, I'm <span className="hero-name">Mesfine</span>.
          </h1>
          <p className="hero-desc">
            Based in Ethiopia, I'm a full stack developer passionate about building highly interactive, scalable, and responsive web applications.
          </p>
          <a href="#contact" className="link-btn">
            Contact Me
          </a>
        </section>

        <hr className="section-divider container" />

        {/* Skills Section */}
        <section className="skills container">
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-name">HTML & CSS</div>
              <div className="skill-detail">20+ Projects</div>
            </div>
            <div className="skill-card">
              <div className="skill-name">JavaScript</div>
              <div className="skill-detail">15+ Projects</div>
            </div>
            <div className="skill-card">
              <div className="skill-name">React</div>
              <div className="skill-detail">5+ Projects</div>
            </div>
            <div className="skill-card">
              <div className="skill-name">PHP & MySQL</div>
              <div className="skill-detail">10+ Projects</div>
            </div>
            <div className="skill-card">
              <div className="skill-name">Java & FX</div>
              <div className="skill-detail">5+ Projects</div>
            </div>
            <div className="skill-card">
              <div className="skill-name">Git & GitHub</div>
              <div className="skill-detail">Since 2021</div>
            </div>
          </div>
        </section>

        <hr className="section-divider container" />

        {/* Projects Section */}
        <section className="projects container" id="projects">
          <div className="projects-header-row">
            <h2 className="projects-title">Projects</h2>
            <a href="#contact" className="link-btn">
              Contact Me
            </a>
          </div>

          {/* Filter and Search Controls */}
          <div className="controls-container">
            <div className="search-wrapper">
              <i className="bx bx-search"></i>
              <input
                type="text"
                className="search-bar"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              {filterTags.map(tag => (
                <button
                  key={tag}
                  className={`filter-btn${selectedTech === tag ? ' active' : ''}`}
                  onClick={() => setSelectedTech(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Grid of Projects */}
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((proj, idx) => (
                <div key={idx} className="project-card">
                  <div className="project-img-wrapper">
                    {proj.thumb ? (
                      <img src={proj.thumb} alt={proj.name} className="project-img" />
                    ) : (
                      <div className="project-img-placeholder" style={{ background: proj.gradient }}>
                        <i className={`bx ${proj.tech[0]?.icon || 'bx-code-alt'}`}></i>
                        <span>{proj.badge}</span>
                      </div>
                    )}
                    <div className="project-overlay">
                      <button
                        className="overlay-btn"
                        style={{ background: 'transparent', border: 'none' }}
                        onClick={e => handleProjectClick(e, proj.name, 'demo', proj.demoUrl)}
                      >
                        View Project
                      </button>
                      <button
                        className="overlay-btn"
                        style={{ background: 'transparent', border: 'none' }}
                        onClick={e => handleProjectClick(e, proj.name, 'code', proj.codeUrl)}
                      >
                        View Code
                      </button>
                    </div>
                  </div>
                  <h3 className="project-name">{proj.name}</h3>
                  <p className="project-desc">{proj.desc}</p>
                  <div className="project-tags">
                    {proj.tech.map((t, i) => (
                      <span key={i} style={{ color: t.color }}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <i className="bx bx-search-alt"></i>
                <p>No projects matched your search criteria.</p>
              </div>
            )}
          </div>
        </section>

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
              <button className="btn-outline" onClick={handleMessage}>
                <i className="bx bx-envelope"></i> Email Me
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <hr className="footer-divider" />
          <div className="footer-content">
            <div className="logo">Mesfine</div>
            <div className="socials">
              {socials.map((s, idx) => (
                <button
                  key={idx}
                  className="social-link"
                  onClick={() => handleSocialClick(s.aria, s.url)}
                  aria-label={s.aria}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <i className={`bx ${s.icon}`}></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Interactive Server Terminal Control */}
      <button className="debug-toggle" onClick={() => setConsoleOpen(!consoleOpen)}>
        <span className="debug-badge"></span>
        {consoleOpen ? 'Close Live Panel' : '⚡ Live Console'}
      </button>

      {consoleOpen && (
        <div className="console-panel">
          <div className="console-header">
            <span className="console-title">
              <i className="bx bx-server"></i> Simulated Server Backend
            </span>
            <button className="console-close" onClick={() => setConsoleOpen(false)}>
              &times;
            </button>
          </div>
          <div className="console-body">
            <div className="console-status-row">
              <span>Status:</span>
              <span className="status-badge" style={{ color: msgStyle, background: 'rgba(78, 225, 160, 0.1)' }}>
                {statusMsg}
              </span>
            </div>

            {/* Dashboard Stats */}
            <div className="console-stats">
              <div className="console-stat-card">
                <span className="console-stat-num">{likes}</span>
                <span className="console-stat-lbl">Likes</span>
              </div>
              <div className="console-stat-card">
                <span className="console-stat-num">{messages}</span>
                <span className="console-stat-lbl">Chats</span>
              </div>
              <div className="console-stat-card">
                <span className="console-stat-num">{shares}</span>
                <span className="console-stat-lbl">Runs</span>
              </div>
            </div>

            {/* Express Terminal Buttons */}
            <div className="console-actions">
              <button className="console-btn" onClick={handleHire}>
                <i className="bx bx-heart"></i> Trigger /api/hire
              </button>
              <button className="console-btn" onClick={handleMessage}>
                <i className="bx bx-envelope"></i> Trigger /api/message
              </button>
              <button className="console-btn special" onClick={handleNodeRun}>
                <i className="bx bx-play-circle"></i> Run Express Middleware
              </button>
            </div>

            {/* Live Logs Feed */}
            <div className="console-logs">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className={`log-entry ${log.type}`}>
                  [{log.time}] [{log.type.toUpperCase()}] {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
