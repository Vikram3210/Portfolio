// components/About.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { userAPI } from "../services/api";
import "./About.css";

function About() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await userAPI.getMe();
        setUserData(data.user);
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      loadUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  const displayUser = userData || user;

  return (
    <div className="about-section">
      <div className="container">
        <div className="about-header">
          <h1 className="about-title">About Me</h1>
          {displayUser?.bio ? (
            <p className="about-bio">{displayUser.bio}</p>
          ) : (
            <p className="about-bio">Hello! I'm {displayUser?.name || 'a student'} passionate about technology and development.</p>
          )}

          {displayUser?.location && (
            <div className="about-location">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              {displayUser.location}
            </div>
          )}

          {displayUser?.socialLinks && (
            <div className="about-social">
              {displayUser.socialLinks.github && (
                <a href={displayUser.socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </a>
              )}
              {displayUser.socialLinks.linkedin && (
                <a href={displayUser.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              )}
              {displayUser.socialLinks.twitter && (
                <a href={displayUser.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
              )}
              {displayUser.socialLinks.website && (
                <a href={displayUser.socialLinks.website} target="_blank" rel="noopener noreferrer" className="btn btn-outline-secondary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  Website
                </a>
              )}
            </div>
          )}
        </div>

        {displayUser?.education && displayUser.education.length > 0 && (
          <div className="education-section">
            <h2 className="section-heading">Education</h2>
            <div className="education-list">
              {displayUser.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <div className="education-degree">{edu.degree}</div>
                  <div className="education-institution">{edu.institution}</div>
                  {edu.field && <div className="education-field">{edu.field}</div>}
                  <div className="education-dates">
                    {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                    {edu.grade && <span> • Grade: {edu.grade}</span>}
                  </div>
                  {edu.description && (
                    <div className="education-description">{edu.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {displayUser?.experience && displayUser.experience.length > 0 && (
          <div className="experience-section">
            <h2 className="section-heading">Experience</h2>
            <div className="experience-list">
              {displayUser.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <div className="experience-position">{exp.position}</div>
                  <div className="experience-company">{exp.company}</div>
                  {exp.location && <div className="experience-location">{exp.location}</div>}
                  <div className="experience-dates">
                    {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </div>
                  {exp.description && (
                    <div className="experience-description">{exp.description}</div>
                  )}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="experience-responsibilities">
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex}>{resp}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default About;

