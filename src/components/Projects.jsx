import React, { useState, useEffect } from "react";
import { projectAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Projects.css";

function Projects({ previewCount, userId }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadProjects();
  }, [userId, user]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      let projectsData;

      if (userId) {
        projectsData = await projectAPI.getProjectsByUserId(userId);
      } else if (user) {
        projectsData = await projectAPI.getMyProjects();
      } else {
        projectsData = await projectAPI.getFeaturedProjects();
      }

      const allProjects = projectsData.projects || projectsData || [];
      
      const filteredProjects = typeof previewCount === "number" 
        ? allProjects.filter(p => p.featured).slice(0, previewCount)
        : allProjects;
      
      setProjects(filteredProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="projects-section">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="projects-section">
      <div className="section-header">
        <h2 className="section-title">Featured Projects</h2>
        {typeof previewCount === "number" && (
          <a className="btn btn-outline-primary" href="/gallery">
            View All Projects →
          </a>
        )}
      </div>
      {projects.length === 0 ? (
        <div className="empty-state">
          <p className="text-muted">No projects found. Start building your portfolio!</p>
        </div>
      ) : (
        <div className="projects-grid">
          {projects.map((p) => (
            <div key={p._id || p.id} className="project-card">
              <div className="project-image-wrapper">
                <img 
                  src={p.image || '/vite.svg'} 
                  className="project-image" 
                  alt={p.title} 
                  onError={(e) => { e.target.src = '/vite.svg'; }}
                />
                {p.featured && (
                  <span className="featured-badge">Featured</span>
                )}
              </div>
              <div className="project-content">
                <h3 className="project-title">{p.title}</h3>
                <p className="project-description">{p.description}</p>
                {p.technologies && p.technologies.length > 0 && (
                  <div className="project-technologies">
                    {p.technologies.map((tech, index) => (
                      <span key={index} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="project-actions">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      Live Demo
                    </a>
                  )}
                  {p.githubUrl && (
                    <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '4px' }}>
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
