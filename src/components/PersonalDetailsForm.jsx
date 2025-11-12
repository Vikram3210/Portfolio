import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';

function PersonalDetailsForm({ onCancel }) {
  const { user, getCurrentUser } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    title: '',
    location: '',
    avatar: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      website: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        title: user.title || '',
        location: user.location || '',
        avatar: user.avatar || '',
        socialLinks: {
          github: user.socialLinks?.github || '',
          linkedin: user.socialLinks?.linkedin || '',
          twitter: user.socialLinks?.twitter || '',
          website: user.socialLinks?.website || ''
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social.')) {
      const socialKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await userAPI.updateMe(formData);
      await getCurrentUser();
      if (onCancel) onCancel();
    } catch (err) {
      setError(err.message || 'Failed to update personal details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Personal Details</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Professional Title</label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Computer Science Student, Full Stack Developer"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    className="form-control"
                    id="bio"
                    name="bio"
                    rows="4"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself..."
                  ></textarea>
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
                    placeholder="e.g., New York, USA"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="avatar" className="form-label">Profile Picture URL</label>
                  <input
                    type="url"
                    className="form-control"
                    id="avatar"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>

                <div className="card mb-3">
                  <div className="card-header">
                    <h6 className="mb-0">Social Links</h6>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label htmlFor="github" className="form-label">GitHub</label>
                      <input
                        type="url"
                        className="form-control"
                        id="github"
                        name="social.github"
                        value={formData.socialLinks.github}
                        onChange={handleChange}
                        placeholder="https://github.com/username"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="linkedin" className="form-label">LinkedIn</label>
                      <input
                        type="url"
                        className="form-control"
                        id="linkedin"
                        name="social.linkedin"
                        value={formData.socialLinks.linkedin}
                        onChange={handleChange}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="twitter" className="form-label">Twitter</label>
                      <input
                        type="url"
                        className="form-control"
                        id="twitter"
                        name="social.twitter"
                        value={formData.socialLinks.twitter}
                        onChange={handleChange}
                        placeholder="https://twitter.com/username"
                      />
                    </div>

                    <div className="mb-0">
                      <label htmlFor="website" className="form-label">Website</label>
                      <input
                        type="url"
                        className="form-control"
                        id="website"
                        name="social.website"
                        value={formData.socialLinks.website}
                        onChange={handleChange}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                  {onCancel && (
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalDetailsForm;

