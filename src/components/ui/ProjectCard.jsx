export default function ProjectCard({ proj, onProjectClick }) {
  return (
    <div className="project-card">
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
            onClick={(e) => onProjectClick(e, proj.name, 'demo', proj.demoUrl)}
          >
            View Project
          </button>
          <button
            className="overlay-btn"
            style={{ background: 'transparent', border: 'none' }}
            onClick={(e) => onProjectClick(e, proj.name, 'code', proj.codeUrl)}
          >
            View Code
          </button>
        </div>
      </div>
      <h3 className="project-name">{proj.name}</h3>
      <p className="project-desc">{proj.desc}</p>
      <div className="project-tags">
        {proj.tech.map((t) => (
          <span key={t.name} style={{ color: t.color }}>
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
