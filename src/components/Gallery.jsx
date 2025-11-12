import React, { useState, useEffect } from 'react';
import { projectAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function Gallery() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadProjects();
  }, [user]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      let projectsData;

      if (user) {
        // Load current user's projects
        projectsData = await projectAPI.getMyProjects();
      } else {
        // Load all projects (public)
        projectsData = await projectAPI.getAllProjects();
      }

      const allProjects = projectsData.projects || projectsData || [];
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-3">Gallery</h1>
      <p className="text-muted mb-4">Some of my recent work and screenshots will appear here.</p>
      {projects.length === 0 ? (
        <p className="text-muted">No projects found.</p>
      ) : (
        <div className="row g-4">
          {projects.map(project => (
            <div key={project._id || project.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <img 
                  src={project.image || '/vite.svg'} 
                  className="card-img-top" 
                  alt={project.title} 
                  style={{ height: '200px', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/vite.svg'; }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.description}</p>
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="badge bg-secondary me-1 mb-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-auto d-flex gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary btn-sm">
                        GitHub
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <a href="#" className="btn btn-sm btn-outline-primary">Details</a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
