import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function DesktopShell() {
	const { isAuthenticated, user, logout } = useAuth()
	const navigate = useNavigate()

	const handleLogout = () => {
		logout()
		navigate('/login')
	}

	return (
		<div className="desktop-shell">
			<aside className="desktop-shell__sidebar">
				<div className="desktop-shell__brand">Portfolio</div>
				<nav className="desktop-shell__nav">
					<NavLink end to="/" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Home</NavLink>
					<NavLink to="/gallery" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Gallery</NavLink>
					<NavLink to="/about" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>About</NavLink>
					<NavLink to="/contact" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Contact</NavLink>
					{isAuthenticated ? (
						<NavLink to="/admin" className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>Dashboard</NavLink>
					) : null}
				</nav>
				<div className="desktop-shell__footer">
					{isAuthenticated ? (
						<>
							<div className="user">
								<div className="avatar" aria-hidden />
								<div className="meta">
									<div className="name">{user?.name}</div>
									<div className="email" title={user?.email}>{user?.email}</div>
								</div>
							</div>
							<button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
						</>
					) : (
						<div className="auth-actions">
							<button className="btn btn-light btn-sm" onClick={() => navigate('/login')}>Login</button>
							<button className="btn btn-secondary btn-sm" onClick={() => navigate('/register')}>Register</button>
						</div>
					)}
				</div>
			</aside>
			<main className="desktop-shell__content">
				<header className="desktop-shell__topbar">
					<div className="title">{isAuthenticated ? 'My Portfolio' : 'Welcome'}</div>
				</header>
				<section className="desktop-shell__page">
					<Outlet />
				</section>
			</main>
		</div>
	)
}

export default DesktopShell
