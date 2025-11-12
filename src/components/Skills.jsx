import React, { useEffect, useState } from "react";
import { userAPI } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Skills.css";

function Skills({ userId }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadSkills();
  }, [userId, user]);

  const loadSkills = async () => {
    try {
      setLoading(true);
      let userData;

      if (userId) {
        userData = await userAPI.getUserById(userId);
      } else if (user) {
        userData = await userAPI.getMe();
      } else {
        setSkills([]);
        setLoading(false);
        return;
      }

      const skillsData = userData.user?.skills || [];
      setSkills(skillsData);
    } catch (error) {
      console.error('Error loading skills:', error);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="skills-section">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </section>
    );
  }

  if (skills.length === 0) {
    return (
      <section className="skills-section">
        <h2 className="section-title">Skills & Expertise</h2>
        <div className="empty-state">
          <p className="text-muted">No skills available yet. Add your skills in the dashboard!</p>
        </div>
      </section>
    );
  }

  return (
    <section className="skills-section">
      <h2 className="section-title">Skills & Expertise</h2>
      <div className="skills-container">
        <div className="skills-grid">
          {skills.map((s, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{s.name}</span>
                <span className="skill-level">{s.level}%</span>
              </div>
              <div className="skill-progress-wrapper">
                <div 
                  className="skill-progress-bar" 
                  style={{ width: `${s.level}%` }}
                  role="progressbar"
                  aria-valuenow={s.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div className="skill-progress-fill"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
