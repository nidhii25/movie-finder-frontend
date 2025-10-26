import React from 'react'

export default function About() {
  const CONTACT = {
    github: 'https://github.com/yourusername',
    linkedin: 'https://www.linkedin.com/in/yourusername',
    email: 'you@example.com',
  }

  return (
    <section className="container">
      <h1>About MovieFinder</h1>
      <div className="about-grid">
        <div className="about-card">
          <h2>Overview</h2>
          <p>
            MovieFinder is a lightweight interface for discovering films you’ll love. Browse trending,
            popular, and top‑rated titles, dig into detailed movie pages, and get tailored recommendations
            based on your preferences.
          </p>
        </div>

        <div className="about-card">
          <h2>Features</h2>
          <ul>
            <li>Discover trending, popular, and top‑rated movies at a glance</li>
            <li>Filter by genre and sort by popularity, rating, or release date</li>
            <li>Search the catalog and jump straight to rich movie detail pages</li>
            <li>See similar movies to keep your watchlist growing</li>
            <li>Generate recommendations by genre, favorite titles, and minimum rating</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>How it works</h2>
          <p>
            This frontend talks to a FastAPI backend that aggregates and serves movie data via JSON endpoints
            (trending, top rated, genres, search, recommendations, and more). The UI focuses on speed,
            accessibility, and clear information hierarchy.
          </p>
        </div>

        <div className="about-card">
          <h2>Tech stack</h2>
          <ul>
            <li>React 18 + React Router</li>
            <li>Vite for fast dev and optimized builds</li>
            <li>Vanilla CSS with a small design system (see <code>src/index.css</code>)</li>
            <li>FastAPI backend (see <code>src/api.js</code> for endpoints)</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>Contact</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'grid', gap: 8 }}>
            <li>
              <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: 8 }}>code</span>
              <a href="https://github.com/nidhii25" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: 8 }}>work</span>
              <a href= "https://www.linkedin.com/in/nidhiagrawal25/"target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </li>
            <li>
              <span className="material-symbols-outlined" style={{ verticalAlign: 'middle', marginRight: 8 }}>mail</span>
              <a href="devnidhi15@gmail.com">{CONTACT.email}</a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
