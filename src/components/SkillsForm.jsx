import React, { useState, useEffect } from 'react';

function SkillsForm({ skill, onSave, onCancel }) {
  const [formData, setFormData] = useState({ name: '', level: 50 });

  useEffect(() => {
    if (skill) {
      setFormData({ name: skill.name || '', level: skill.level ?? 50 });
    }
  }, [skill]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'level' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter a skill name');
      return;
    }
    if (formData.level < 0 || formData.level > 100) {
      alert('Level must be between 0 and 100');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">{skill ? 'Edit Skill' : 'Add Skill'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name *</label>
                  <input type="text" id="name" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="level" className="form-label">Level (0-100) *</label>
                  <input type="number" id="level" name="level" className="form-control" min="0" max="100" value={formData.level} onChange={handleChange} required />
                </div>
                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">{skill ? 'Update' : 'Add'} Skill</button>
                  <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkillsForm;

