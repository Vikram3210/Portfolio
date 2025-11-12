import React, { useState, useEffect } from 'react';

function CertificationForm({ certification, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    expiryDate: '',
    credentialId: '',
    credentialUrl: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    if (certification) {
      setFormData({
        name: certification.name || '',
        issuer: certification.issuer || '',
        issueDate: certification.issueDate || '',
        expiryDate: certification.expiryDate || '',
        credentialId: certification.credentialId || '',
        credentialUrl: certification.credentialUrl || '',
        image: certification.image || '',
        description: certification.description || ''
      });
    }
  }, [certification]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Please enter certification name');
      return;
    }
    if (!formData.issuer.trim()) {
      alert('Please enter issuer name');
      return;
    }
    if (!formData.image.trim()) {
      alert('Please provide an image URL');
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
              <h4 className="mb-0">{certification ? 'Edit Certification' : 'Add Certification'}</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">Name *</label>
                      <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="issuer" className="form-label">Issuer *</label>
                      <input type="text" className="form-control" id="issuer" name="issuer" value={formData.issuer} onChange={handleChange} required />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="issueDate" className="form-label">Issue Date</label>
                      <input type="date" className="form-control" id="issueDate" name="issueDate" value={formData.issueDate} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                      <input type="date" className="form-control" id="expiryDate" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="credentialId" className="form-label">Credential ID</label>
                      <input type="text" className="form-control" id="credentialId" name="credentialId" value={formData.credentialId} onChange={handleChange} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="credentialUrl" className="form-label">Credential URL</label>
                      <input type="url" className="form-control" id="credentialUrl" name="credentialUrl" value={formData.credentialUrl} onChange={handleChange} placeholder="https://verify.example.com/cert/123" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">Image URL *</label>
                      <input type="url" className="form-control" id="image" name="image" value={formData.image} onChange={handleChange} required placeholder="https://example.com/certificate.jpg" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description</label>
                      <input type="text" className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} placeholder="Short description" />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary">{certification ? 'Update' : 'Add'} Certification</button>
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

export default CertificationForm;

