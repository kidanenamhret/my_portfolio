import { useState } from 'react';
import { PROJECTS, FILTER_TAGS } from '../../data/constants';
import ProjectCard from '../ui/ProjectCard';

export default function Projects({ onProjectClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState('All');

  const filteredProjects = PROJECTS.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTech = selectedTech === 'All' || project.tech.some(t => t.name === selectedTech);
    return matchesSearch && matchesTech;
  });

  return (
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
            <ProjectCard key={proj.id} proj={proj} onProjectClick={onProjectClick} />
          ))
        ) : (
          <div className="no-results">
            <i className="bx bx-search-alt"></i>
            <p>No projects matched your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
