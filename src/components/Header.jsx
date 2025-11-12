// components/header.jsx
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <Link className="navbar-brand" to="/">
          {isAuthenticated && user ? user.name : 'Portfolio'}
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#mainNavbar" 
          aria-controls="mainNavbar" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/gallery">
                Gallery
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/contact">
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/about">
                About
              </NavLink>
            </li>
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/admin">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <span className="nav-link" style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>
                    {user?.name}
                  </span>
                </li>
                <li className="nav-item">
                  <button 
                    className="btn btn-outline-primary btn-sm ms-2" 
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to="/register">
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
