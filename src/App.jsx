import { useState, useEffect, useRef } from 'react';
import './design.css';

// ─── Static data outside component to avoid recreation on every render ────────

const PROJECTS = [
  {
    id: 'omr-hu',
    name: 'OMR HU',
    badge: 'Hosted',
    desc: 'Orthodox Members Registry for Hawassa University Fellowship. A full-stack Progressive Web App (PWA) for managing student records, academic/department distributions (with Recharts), mentorship bonds, spiritual profiles, and Telegram broadcast notifications.',
    tech: [
      { name: 'React', icon: 'bxl-react', color: '#61dafb' },
      { name: 'Tailwind CSS', icon: 'bxl-tailwind-css', color: '#38bdf8' },
      { name: 'Node.js', icon: 'bxl-nodejs', color: '#339933' },
      { name: 'MongoDB', icon: 'bx-data', color: '#47a248' }
    ],
    gradient: 'linear-gradient(135deg, #800020, #c8a84b)',
    demoUrl: 'https://omr-hu-3b9e.vercel.app/',
    codeUrl: 'https://github.com/mesfin/omr-hu',
    thumb: '/omr-hu-cover.png'
  },
  {
    id: 'tikur-abay-bank',
    name: 'Tikur Abay Bank',
    badge: 'Demo',
    desc: 'Educational banking UI demo showcasing login flow and secure UI components. Built with HTML, CSS, PHP backend, and Font Awesome icons.',
    tech: [
      { name: 'HTML', icon: 'bxl-html5', color: '#e34f26' },
      { name: 'CSS', icon: 'bxl-css3', color: '#1572b6' },
      { name: 'PHP', icon: 'bxl-php', color: '#777bb4' },
      { name: 'Font Awesome', icon: 'bxl-fontawesome', color: '#039be5' }
    ],
    gradient: 'linear-gradient(135deg, #020617, #1e1b4b)',
    demoUrl: 'http://mesfina6305.infinityfreeapp.com/',
    codeUrl: 'https://github.com/mesfin/tikur-abay-bank',
    thumb: '/tikur-abay-cover.png'
  },
  {


    id: 'one-prime-gym',
    name: 'One Prime Gym',
    badge: 'In Progress',
    desc: 'A modern fitness platform for One Prime Gym featuring trainer profiles, class scheduling, membership pricing, a BMI calculator, and a member login portal. Designed for Ethiopian fitness coaches and clients.',
    tech: [
      { name: 'HTML', icon: 'bxl-html5', color: '#e34f26' },
      { name: 'CSS', icon: 'bxl-css3', color: '#1572b6' },
      { name: 'JavaScript', icon: 'bxl-javascript', color: '#f7df1e' },
      { name: 'PHP', icon: 'bxl-php', color: '#777bb4' }
    ],
    gradient: 'linear-gradient(135deg, #0a0a0a, #39ff14)',
    demoUrl: 'https://github.com/mesfin/one-prime-gym',
    codeUrl: 'https://github.com/mesfin/one-prime-gym',
    thumb: '/one-prime-cover.png'
  },
  {
    id: 'ethio-farmers-market',
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
    demoUrl: 'https://github.com/mesfin/ethio-farmers-market',
    codeUrl: 'https://github.com/mesfin/ethio-farmers-market',
    thumb: '/ethio-market/home.png'
  },
  {
    id: 'tade-campus-event',
    name: 'Tade Campus Event',
    badge: 'Desktop App',
    desc: 'A desktop Campus Event Management System with robust role governance (Admin/User), SQLite database configuration, alerts management, and view transition control.',
    tech: [
      { name: 'Java', icon: 'bxl-java', color: '#f89820' },
      { name: 'JavaFX', icon: 'bx-desktop', color: '#5382a1' },
      { name: 'SQLite', icon: 'bx-data', color: '#003b57' }
    ],
    gradient: 'linear-gradient(135deg, #1e3c72, #2a5298)',
    demoUrl: 'https://github.com/mesfin/tade-campus/releases',
    codeUrl: 'https://github.com/mesfin/tade-campus',
    thumb: '/tade-campus.png'
  }
];

// 'React' and 'Tailwind CSS' added since OMR HU uses them
const FILTER_TAGS = ['All', 'React', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Java', 'JavaFX', 'SQLite'];

const SOCIALS = [
  { icon: 'bxl-github', aria: 'github', url: 'https://github.com/mesfin' },
  { icon: 'bx-code-alt', aria: 'frontend-mentor', url: 'https://www.frontendmentor.io' },
  { icon: 'bxl-linkedin', aria: 'linkedin', url: 'https://linkedin.com' },
  { icon: 'bxl-twitter', aria: 'twitter', url: 'https://twitter.com' }
];

// Maximum log entries kept in memory to prevent unbounded growth
const MAX_LOGS = 50;

// ─── Component ────────────────────────────────────────────────────────────────

function App() {
  // Reactive stats (synced with console log widget)
  const [likes, setLikes] = useState(64);
  const [messages, setMessages] = useState(23);
  const [shares, setShares] = useState(15);
  const [statusMsg, setStatusMsg] = useState('online · ready to connect');
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState([]);

  // Ref to cancel pending status-reset timeout and avoid stale closures
  const statusTimeoutRef = useRef(null);

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.tech.some(t => t.name === selectedTech);
    return matchesSearch && matchesTech;
  });

  // Append a server-style log entry; cap at MAX_LOGS to prevent unbounded growth
  const addLog = (message, type = 'info') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setConsoleLogs(prev => [...prev.slice(-(MAX_LOGS - 1)), { time, message, type }]);
  };

  const setTemporaryStatus = (text, color = '#4ee1a0') => {
    // Cancel any in-flight reset before starting a new one
    if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    setStatusMsg(text);
    setMsgStyle(color);
    statusTimeoutRef.current = setTimeout(() => {
      setStatusMsg('online · ready to connect');
      setMsgStyle('#4ee1a0');
    }, 2500);
  };

  const handleHire = () => {
    addLog('POST /api/hire - 200 OK - { dev: "Mesfin" }', 'success');
    setLikes(l => l + 1);
    setTemporaryStatus('hiring request sent', '#4ee1a0');
  };

  // Used by the console "Trigger /api/message" button only
  const handleMessage = () => {
    addLog('POST /api/message - 200 OK - { to: "Mesfin" }', 'success');
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
    // noopener,noreferrer prevents the new tab from accessing window.opener
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleProjectClick = (e, projectName, type, url) => {
    e.preventDefault();
    addLog(`GET /api/project-click - 200 OK - { project: "${projectName}", type: "${type}" }`, 'info');
    setTemporaryStatus(`redirecting to ${type}...`, '#5ae9aa');
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 500);
  };

  // Log initial connection on startup; return cleanup to cancel timers on unmount
  useEffect(() => {
    addLog('System - connecting to simulated Node.js backend...', 'info');
    const initTimer = setTimeout(() => {
      addLog('Express - server running on port 5000', 'success');
      addLog('MongoDB - database state connected', 'success');
    }, 600);
    return () => {
      clearTimeout(initTimer);
      if (statusTimeoutRef.current) clearTimeout(statusTimeoutRef.current);
    };
  }, []);

  return (
    <div className={`portfolio-app ${isLightTheme ? 'light-theme' : ''}`}>
      {/* Header Container */}
      <header className="header container">
        <div className="logo">Mesfin</div>
        <nav className="socials">
          {/* key uses s.aria (stable unique string) instead of array index */}
          {SOCIALS.map((s) => (
            <button
              key={s.aria}
              className="social-link"
              onClick={() => handleSocialClick(s.aria, s.url)}
              aria-label={s.aria}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              <i className={`bx ${s.icon}`}></i>
            </button>
          ))}
        </nav>
        <button
          className="theme-toggle"
          onClick={() => setIsLightTheme(prev => !prev)}
          aria-label="Toggle theme"
        >
          <i className={isLightTheme ? 'bx bx-moon' : 'bx bx-sun'}></i>
        </button>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero container">
          <div className="hero-avatar-wrapper">
            <img src="/profile.png" alt="Mesfin" className="hero-avatar" />
          </div>
          <h1 className="hero-title">
            Hello, I'm <span className="hero-name">Mesfin</span>.
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
              {FILTER_TAGS.map(tag => (
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
              filteredProjects.map((proj) => (
                /* key uses proj.id (stable unique string) instead of array index */
                <div key={proj.id} className="project-card">
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
                    {/* key uses t.name (unique within each project) instead of array index */}
                    {proj.tech.map((t) => (
                      <span key={t.name} style={{ color: t.color }}>
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
              {/* Real mailto: link so clicking actually opens the user's email client */}
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

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <hr className="footer-divider" />
          <div className="footer-content">
            <div className="logo">Mesfin</div>
            <div className="socials">
              {SOCIALS.map((s) => (
                <button
                  key={s.aria}
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
