import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectAPI, userAPI } from '../services/api';
import ProjectForm from './ProjectForm';
import CertificationForm from './CertificationForm';
import SkillsForm from './SkillsForm';
import PersonalDetailsForm from './PersonalDetailsForm';
import EducationForm from './EducationForm';
import ExperienceForm from './ExperienceForm';

function AdminDashboard() {
  const { user, logout, getCurrentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [certifications, setCertifications] = useState([]);
  const [showCertForm, setShowCertForm] = useState(false);
  const [editingCertification, setEditingCertification] = useState(null); // Will store index

  const [skills, setSkills] = useState([]);
  const [showSkillsForm, setShowSkillsForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null); // Will store index

  const [education, setEducation] = useState([]);
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

  const [experience, setExperience] = useState([]);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  const [showPersonalDetails, setShowPersonalDetails] = useState(false);

  // Load user data from MongoDB
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Get user data with projects
      const userData = await userAPI.getMe();
      const user = userData.user;
      
      // Load projects
      const projectsData = await projectAPI.getMyProjects();
      setProjects(projectsData.projects || []);
      
      // Load skills, certifications, education, and experience from user profile
      setSkills(user.skills || []);
      setCertifications(user.certifications || []);
      setEducation(user.education || []);
      setExperience(user.experience || []);
    } catch (error) {
      console.error('Error loading user data:', error);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddProject = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectAPI.deleteProject(projectId);
        setProjects(projects.filter(p => p._id !== projectId));
      } catch (error) {
        alert('Failed to delete project: ' + error.message);
      }
    }
  };

  const handleSaveProject = async (projectData) => {
    try {
      if (editingProject) {
        // Update existing project
        const updated = await projectAPI.updateProject(editingProject._id, projectData);
        setProjects(projects.map(p => p._id === editingProject._id ? updated.project : p));
      } else {
        // Add new project
        const newProject = await projectAPI.createProject(projectData);
        setProjects([...projects, newProject.project]);
      }
      setShowForm(false);
      setEditingProject(null);
    } catch (error) {
      alert('Failed to save project: ' + error.message);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  // Certification handlers
  const handleAddCertification = () => {
    setEditingCertification(null);
    setShowCertForm(true);
  };

  const handleEditCertification = (cert, index) => {
    setEditingCertification(index);
    setShowCertForm(true);
  };

  const handleDeleteCertification = async (index) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        const updatedCerts = certifications.filter((_, i) => i !== index);
        await userAPI.updateCertifications(updatedCerts);
        setCertifications(updatedCerts);
        await getCurrentUser(); // Refresh user data
      } catch (error) {
        alert('Failed to delete certification: ' + error.message);
      }
    }
  };

  const handleSaveCertification = async (certData) => {
    try {
      let updatedCerts;
      if (editingCertification !== null && editingCertification >= 0) {
        // Update existing certification at index
        updatedCerts = certifications.map((c, index) =>
          index === editingCertification ? certData : c
        );
      } else {
        // Add new certification
        updatedCerts = [...certifications, certData];
      }
      await userAPI.updateCertifications(updatedCerts);
      setCertifications(updatedCerts);
      setShowCertForm(false);
      setEditingCertification(null);
      await getCurrentUser(); // Refresh user data
    } catch (error) {
      alert('Failed to save certification: ' + error.message);
    }
  };

  const handleCancelCertForm = () => {
    setShowCertForm(false);
    setEditingCertification(null);
  };

  // Skills handlers
  const handleAddSkill = () => {
    setEditingSkill(null);
    setShowSkillsForm(true);
  };

  const handleEditSkill = (skill, index) => {
    setEditingSkill(index);
    setShowSkillsForm(true);
  };

  const handleDeleteSkill = async (index) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        const updatedSkills = skills.filter((_, i) => i !== index);
        await userAPI.updateSkills(updatedSkills);
        setSkills(updatedSkills);
        await getCurrentUser(); // Refresh user data
      } catch (error) {
        alert('Failed to delete skill: ' + error.message);
      }
    }
  };

  const handleSaveSkill = async (skillData) => {
    try {
      let updatedSkills;
      if (editingSkill !== null) {
        // editingSkill is the index
        updatedSkills = skills.map((s, index) =>
          index === editingSkill ? skillData : s
        );
      } else {
        updatedSkills = [...skills, skillData];
      }
      await userAPI.updateSkills(updatedSkills);
      setSkills(updatedSkills);
      setShowSkillsForm(false);
      setEditingSkill(null);
      await getCurrentUser(); // Refresh user data
    } catch (error) {
      alert('Failed to save skill: ' + error.message);
    }
  };

  const handleCancelSkillsForm = () => {
    setShowSkillsForm(false);
    setEditingSkill(null);
  };

  // Education handlers
  const handleAddEducation = () => {
    setEditingEducation(null);
    setShowEducationForm(true);
  };

  const handleEditEducation = (edu, index) => {
    setEditingEducation(index);
    setShowEducationForm(true);
  };

  const handleDeleteEducation = async (index) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        const updatedEducation = education.filter((_, i) => i !== index);
        await userAPI.updateEducation(updatedEducation);
        setEducation(updatedEducation);
        await getCurrentUser();
      } catch (error) {
        alert('Failed to delete education: ' + error.message);
      }
    }
  };

  const handleSaveEducation = async (eduData) => {
    try {
      let updatedEducation;
      if (editingEducation !== null && editingEducation >= 0) {
        updatedEducation = education.map((e, index) =>
          index === editingEducation ? eduData : e
        );
      } else {
        updatedEducation = [...education, eduData];
      }
      await userAPI.updateEducation(updatedEducation);
      setEducation(updatedEducation);
      setShowEducationForm(false);
      setEditingEducation(null);
      await getCurrentUser();
    } catch (error) {
      alert('Failed to save education: ' + error.message);
    }
  };

  const handleCancelEducationForm = () => {
    setShowEducationForm(false);
    setEditingEducation(null);
  };

  // Experience handlers
  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowExperienceForm(true);
  };

  const handleEditExperience = (exp, index) => {
    setEditingExperience(index);
    setShowExperienceForm(true);
  };

  const handleDeleteExperience = async (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        const updatedExperience = experience.filter((_, i) => i !== index);
        await userAPI.updateExperience(updatedExperience);
        setExperience(updatedExperience);
        await getCurrentUser();
      } catch (error) {
        alert('Failed to delete experience: ' + error.message);
      }
    }
  };

  const handleSaveExperience = async (expData) => {
    try {
      let updatedExperience;
      if (editingExperience !== null && editingExperience >= 0) {
        updatedExperience = experience.map((e, index) =>
          index === editingExperience ? expData : e
        );
      } else {
        updatedExperience = [...experience, expData];
      }
      await userAPI.updateExperience(updatedExperience);
      setExperience(updatedExperience);
      setShowExperienceForm(false);
      setEditingExperience(null);
      await getCurrentUser();
    } catch (error) {
      alert('Failed to save experience: ' + error.message);
    }
  };

  const handleCancelExperienceForm = () => {
    setShowExperienceForm(false);
    setEditingExperience(null);
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

  if (showForm) {
    return (
      <ProjectForm
        project={editingProject}
        onSave={handleSaveProject}
        onCancel={handleCancelForm}
      />
    );
  }

  if (showCertForm) {
    return (
      <CertificationForm
        certification={editingCertification !== null ? certifications[editingCertification] : null}
        onSave={handleSaveCertification}
        onCancel={handleCancelCertForm}
      />
    );
  }

  if (showSkillsForm) {
    return (
      <SkillsForm
        skill={editingSkill !== null ? skills[editingSkill] : null}
        onSave={handleSaveSkill}
        onCancel={handleCancelSkillsForm}
      />
    );
  }

  if (showPersonalDetails) {
    return (
      <PersonalDetailsForm
        onCancel={() => {
          setShowPersonalDetails(false);
          loadUserData();
        }}
      />
    );
  }

  if (showEducationForm) {
    return (
      <EducationForm
        education={editingEducation !== null ? education[editingEducation] : null}
        onSave={handleSaveEducation}
        onCancel={handleCancelEducationForm}
      />
    );
  }

  if (showExperienceForm) {
    return (
      <ExperienceForm
        experience={editingExperience !== null ? experience[editingExperience] : null}
        onSave={handleSaveExperience}
        onCancel={handleCancelExperienceForm}
      />
    );
  }

  return (
    <div className="container py-4">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>My Portfolio Dashboard</h1>
        <div>
          <button 
            className="btn btn-outline-primary me-2" 
            onClick={() => setShowPersonalDetails(true)}
          >
            Edit Personal Details
          </button>
          <button 
            className="btn btn-primary me-2" 
            onClick={handleAddProject}
          >
            Add New Project
          </button>
          <button 
            className="btn btn-outline-secondary" 
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Manage Projects</h5>
            </div>
            <div className="card-body">
              {projects.length === 0 ? (
                <p className="text-muted">No projects found. Add your first project!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Technologies</th>
                        <th>Featured</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map(project => (
                        <tr key={project._id}>
                          <td>
                            <img 
                              src={project.image || '/vite.svg'} 
                              alt={project.title}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded"
                              onError={(e) => { e.target.src = '/vite.svg'; }}
                            />
                          </td>
                          <td>{project.title}</td>
                          <td>{project.description}</td>
                          <td>
                            <div className="d-flex flex-wrap gap-1">
                              {project.technologies?.map((tech, index) => (
                                <span key={index} className="badge bg-secondary">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td>
                            {project.featured ? (
                              <span className="badge bg-success">Yes</span>
                            ) : (
                              <span className="badge bg-secondary">No</span>
                            )}
                          </td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditProject(project)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteProject(project._id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manage Certifications</h5>
              <button className="btn btn-sm btn-primary" onClick={handleAddCertification}>Add Certification</button>
            </div>
            <div className="card-body">
              {certifications.length === 0 ? (
                <p className="text-muted">No certifications found. Add your first certification!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Issuer</th>
                        <th>Issued</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((cert, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              src={cert.image || '/vite.svg'}
                              alt={cert.name}
                              style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                              className="rounded"
                              onError={(e) => { e.target.src = '/vite.svg'; }}
                            />
                          </td>
                          <td>{cert.name}</td>
                          <td>{cert.issuer}</td>
                          <td>{cert.issueDate}</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => handleEditCertification(cert, index)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteCertification(index)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Education</h5>
              <button className="btn btn-sm btn-primary" onClick={handleAddEducation}>Add Education</button>
            </div>
            <div className="card-body">
              {education.length === 0 ? (
                <p className="text-muted">No education entries found. Add your first education!</p>
              ) : (
                <div className="list-group">
                  {education.map((edu, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{edu.degree}</h6>
                          <p className="mb-1"><strong>{edu.institution}</strong></p>
                          {edu.field && <p className="mb-1 text-muted">{edu.field}</p>}
                          <small className="text-muted">
                            {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                            {edu.grade && ` • ${edu.grade}`}
                          </small>
                        </div>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditEducation(edu, index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteEducation(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Experience</h5>
              <button className="btn btn-sm btn-primary" onClick={handleAddExperience}>Add Experience</button>
            </div>
            <div className="card-body">
              {experience.length === 0 ? (
                <p className="text-muted">No experience entries found. Add your first experience!</p>
              ) : (
                <div className="list-group">
                  {experience.map((exp, index) => (
                    <div key={index} className="list-group-item">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{exp.position}</h6>
                          <p className="mb-1"><strong>{exp.company}</strong></p>
                          {exp.location && <p className="mb-1 text-muted">{exp.location}</p>}
                          <small className="text-muted">
                            {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                          </small>
                        </div>
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditExperience(exp, index)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDeleteExperience(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Manage Skills</h5>
              <button className="btn btn-sm btn-primary" onClick={handleAddSkill}>Add Skill</button>
            </div>
            <div className="card-body">
              {skills.length === 0 ? (
                <p className="text-muted">No skills found. Add your first skill!</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Level</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((skill, index) => (
                        <tr key={index}>
                          <td>{skill.name}</td>
                          <td>{skill.level}%</td>
                          <td>
                            <div className="btn-group" role="group">
                              <button className="btn btn-sm btn-outline-primary" onClick={() => handleEditSkill(skill, index)}>Edit</button>
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteSkill(index)}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
