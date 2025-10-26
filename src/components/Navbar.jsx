import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(o => !o)
  const close = () => setOpen(false)

  return (
    <header className="site-header" onClick={e => { /* close when clicking outside links on mobile */ if (open && e.target.closest('a')) close() }}>
      <div className="nav">
        <Link to="/" className="brand">MovieFinder</Link>
        <button className="menu-btn" aria-expanded={open} aria-controls="primary-nav" onClick={toggle}>
          <span className="material-symbols-outlined" aria-hidden>menu</span>
          <span className="sr-only">Toggle navigation</span>
        </button>
        <nav id="primary-nav" className={`links ${open ? 'open' : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? 'active' : undefined}>Home</NavLink>
          <NavLink to="/genres" className={({ isActive }) => isActive ? 'active' : undefined}>Genres</NavLink>
          <NavLink to="/recommendations" className={({ isActive }) => isActive ? 'active' : undefined}>Recommendations</NavLink>
          <NavLink to="/search" className={({ isActive }) => isActive ? 'active' : undefined}>Search</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : undefined}>About</NavLink>
        </nav>
      </div>
    </header>
  )
}
