// Minimal API client for the FastAPI backend
const BASE = "https://movie-finder-backend-hoin.onrender.com"

async function fetchJson(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) {
    let detail = ''
    try { const data = await res.json(); detail = data.detail || JSON.stringify(data) } catch {}
    throw new Error(`${res.status} ${res.statusText}${detail ? ` - ${detail}` : ''}`)
  }
  return res.json()
}

export const api = {
  async getTrending(count = 15, page = 1) {
    const data = await fetchJson(`${BASE}/movies/trending?count=${count}&page=${page}`)
    return data.trending_movies || []
  },
  async getTopRated(count = 15, page = 1) {
    const data = await fetchJson(`${BASE}/movies/top_rated?count=${count}&page=${page}`)
    return data.top_rated_movies || []
  },
  async getUpcoming(count = 15, page = 1) {
    const data = await fetchJson(`${BASE}/movies/upcoming?count=${count}&page=${page}`)
    return data.upcoming_movies || []
  },
  async getMovies(count = 10, page = 1) {
    const data = await fetchJson(`${BASE}/movies?count=${count}&page=${page}`)
    return data.movies || []
  },
  async getMovie(id) {
    return fetchJson(`${BASE}/movie/${id}`)
  },
  async getGenres() {
    const data = await fetchJson(`${BASE}/genres`)
    return data.genres || []
  },
  async getMoviesByGenre(genreId, count = 15, page = 1) {
    const data = await fetchJson(`${BASE}/genres/${genreId}/movies?count=${count}&page=${page}`)
    return data.movies || []
  },
  async getMoviesByGenreSorted(genreId, sort_by, count = 15, page = 1) {
    const data = await fetchJson(`${BASE}/genres/${genreId}/movies/sort?sort_by=${encodeURIComponent(sort_by)}&count=${count}&page=${page}`)
    // This endpoint returns an array directly
    return Array.isArray(data) ? data : (data.movies || [])
  },
  async searchMovies(query, count = 10, page = 1) {
    const data = await fetchJson(`${BASE}/search?query=${encodeURIComponent(query)}&count=${count}&page=${page}`)
    return Array.isArray(data) ? data : (data.movies || [])
  },
  async getRecommendations(body) {
    const data = await fetchJson(`${BASE}/recommendations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    return data.recommended_movies || []
  }
}
