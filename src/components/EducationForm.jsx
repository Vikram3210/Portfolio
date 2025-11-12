import React, { useState, useEffect } from 'react';

function EducationForm({ education, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    grade: '',
    description: '',
    currentlyStudying: false
  });

  useEffect(() => {
    if (education) {
      setFormData({
        institution: education.institution || '',
        degree: education.degree || '',
        field: education.field || '',
        startDate: education.startDate || '',
        endDate: education.endDate || '',
        grade: education.grade || '',
        description: education.description || '',
        currentlyStudying: education.currentlyStudying || false
      });
    }
  }, [education]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.institution.trim() || !formData.degree.trim()) {
      alert('Please fill in institution and degree');
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
                {education ? 'Edit Education' : 'Add Education'}
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="institution" className="form-label">Institution *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        placeholder="e.g., University of Technology"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="degree" className="form-label">Degree *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="degree"
                        name="degree"
                        value={formData.degree}
                        onChange={handleChange}
                        required
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="field" className="form-label">Field of Study</label>
                  <input
                    type="text"
                    className="form-control"
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science"
                  />
                </div>

                <div className="row">
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="startDate" className="form-label">Start Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        placeholder="e.g., Sep 2020"
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="endDate" className="form-label">End Date</label>
                      <input
                        type="text"
                        className="form-control"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        placeholder="e.g., May 2024"
                        disabled={formData.currentlyStudying}
                      />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mb-3">
                      <label htmlFor="grade" className="form-label">Grade/GPA</label>
                      <input
                        type="text"
                        className="form-control"
                        id="grade"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        placeholder="e.g., 3.8/4.0"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="currentlyStudying"
                      name="currentlyStudying"
                      checked={formData.currentlyStudying}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="currentlyStudying">
                      Currently studying here
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
                    placeholder="Additional details about your education..."
                  ></textarea>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">
                    {education ? 'Update Education' : 'Add Education'}
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

export default EducationForm;

