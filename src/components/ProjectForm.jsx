import React, { useState, useEffect } from 'react';

function ProjectForm({ project, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    featured: false
  });
  const [newTechnology, setNewTechnology] = useState('');

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        image: project.image || '',
        technologies: project.technologies || [],
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured || false
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddTechnology = (e) => {
    e.preventDefault();
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter a project description');
      return;
    }
    if (!formData.image.trim()) {
      alert('Please enter an image URL');
      return;
    }

    onSave(formData);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">
                {project ? 'Edit Project' : 'Add New Project'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Project Title *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image URL *</label>
                      <input
                        type="url"
                        className="form-control"
                        id="image"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="liveUrl" className="form-label">Live URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="liveUrl"
                        name="liveUrl"
                        value={formData.liveUrl}
                        onChange={handleChange}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="githubUrl" className="form-label">GitHub URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="githubUrl"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleChange}
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Technologies</label>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="Add technology (e.g., React, JavaScript)"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleAddTechnology}
                    >
                      Add
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-1">
                    {formData.technologies.map((tech, index) => (
                      <span key={index} className="badge bg-primary d-flex align-items-center gap-1">
                        {tech}
                        <button
                          type="button"
                          className="btn-close btn-close-white"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => handleRemoveTechnology(tech)}
                        ></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="featured">
                      Featured Project (shows on homepage)
                    </label>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {project ? 'Update Project' : 'Add Project'}
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={onCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectForm;

