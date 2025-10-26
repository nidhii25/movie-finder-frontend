import React from 'react'

export default function MovieCard({ movie }) {
  const title = movie.title || movie.name || 'Untitled'
  const overview = movie.overview || movie.description || ''
  const rating = movie.vote_average ?? movie.rating ?? null
  const release = movie.release_date || movie.first_air_date || movie.releaseDate || ''
  const poster = movie.poster_url || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null)
  return (
    <div className="movie-card">
      {poster && (
        <img src={poster} alt={title} style={{ width: '100%', height: 300, objectFit: 'contain', display: 'block', background: '#000' }} />
      )}
      <div className="movie-card-body">
        <h3 className="movie-title">{title}</h3>
        {overview && <p className="movie-desc">{overview}</p>}
        <div className="movie-meta">
          <div className="meta-row">
            {rating != null && <span title="Rating"><strong>Rating:</strong> {Number(rating).toFixed(1)}</span>}
            {release && <span title="Release date"><strong>Release:</strong> {release}</span>}
          </div>
        </div>
      </div>
    </div>
  )
}