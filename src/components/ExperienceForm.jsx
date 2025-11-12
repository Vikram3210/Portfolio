import React, { useState, useEffect } from 'react';

function ExperienceForm({ experience, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: [],
    currentlyWorking: false
  });
  const [newResponsibility, setNewResponsibility] = useState('');

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || '',
        position: experience.position || '',
        location: experience.location || '',
        startDate: experience.startDate || '',
        endDate: experience.endDate || '',
        description: experience.description || '',
        responsibilities: experience.responsibilities || [],
        currentlyWorking: experience.currentlyWorking || false
      });
    }
  }, [experience]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddResponsibility = (e) => {
    e.preventDefault();
    if (newResponsibility.trim() && !formData.responsibilities.includes(newResponsibility.trim())) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility.trim()]
      }));
      setNewResponsibility('');
    }
  };

  const handleRemoveResponsibility = (respToRemove) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter(resp => resp !== respToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.company.trim() || !formData.position.trim()) {
      alert('Please fill in company and position');
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
                {experience ? 'Edit Experience' : 'Add Experience'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="company" className="form-label">Company *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Tech Corp"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="position" className="form-label">Position *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Software Developer Intern"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., New York, NY (Remote)"
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Start Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder="e.g., Jun 2023"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">End Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        placeholder="e.g., Aug 2023"
                        disabled={formData.currentlyWorking}
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="currentlyWorking"
                      name="currentlyWorking"
                      checked={formData.currentlyWorking}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="currentlyWorking">
                      Currently working here
                    </label>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description of your role..."
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label className="form-label">Key Responsibilities</label>
                  <div className="d-flex gap-2 mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={newResponsibility}
                      onChange={(e) => setNewResponsibility(e.target.value)}
                      placeholder="Add responsibility (e.g., Developed REST APIs)"
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      onClick={handleAddResponsibility}
                    >
                      Add
                    </button>
                  </div>
                  <div className="d-flex flex-column gap-1">
                    {formData.responsibilities.map((resp, index) => (
                      <div key={index} className="badge bg-primary d-flex align-items-center justify-content-between" style={{ fontSize: '0.9em', padding: '0.5em' }}>
                        <span>{resp}</span>
                        <button
                          type="button"
                          className="btn-close btn-close-white ms-2"
                          style={{ fontSize: '0.7em' }}
                          onClick={() => handleRemoveResponsibility(resp)}
                        ></button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {experience ? 'Update Experience' : 'Add Experience'}
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

export default ExperienceForm;

