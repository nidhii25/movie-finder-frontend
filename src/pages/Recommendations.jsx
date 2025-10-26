import { useEffect, useState } from 'react'
import { api } from '../api'

const GENRES = ['Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','Horror','Romance','Science Fiction','Thriller']

import { Link } from 'react-router-dom'

export default function Recommendations() {
  const [genre, setGenre] = useState('Action')
  const [fav, setFav] = useState('')
  const [minRating, setMinRating] = useState(7)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getRecs = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await api.getRecommendations({ genre, min_ratings: Number(minRating), fav_movie: fav })
      setResults(data)
    } catch (e) {
      setError(e.message || 'Failed to get recommendations')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col dark group/design-root">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 flex-col lg:flex-row">
          <div className="flex w-full flex-col gap-6 p-6 lg:w-1/3 lg:max-w-md xl:p-8">
            <div className="flex flex-col gap-6 rounded-xl bg-[#1c1c26] p-6">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight text-left">Find Your Next Favorite Movie</h1>
              <div className="flex flex-col gap-4">
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">What's your genre?</p>
                  <select value={genre} onChange={e=>setGenre(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#111121] focus:border-primary h-14">
                    {GENRES.map(g => <option key={g}>{g}</option>)}
                  </select>
                </label>
                <label className="flex flex-col min-w-40 flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">What's a movie you love?</p>
                  <input value={fav} onChange={e=>setFav(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#111121] focus:border-primary h-14 placeholder:text-[#9d9db8] p-[15px] text-base font-normal leading-normal" placeholder="Enter movie title" />
                </label>
                <div className="relative flex w-full flex-col items-start justify-between gap-3">
                  <div className="flex w-full shrink-[3] items-center justify-between">
                    <p className="text-white text-base font-medium leading-normal">Minimum Rating</p>
                    <p className="text-white text-sm font-normal leading-normal">{minRating}</p>
                  </div>
                  <div className="flex h-4 w-full items-center gap-4">
                    <input type="range" min="0" max="10" step="0.1" value={minRating} onChange={e=>setMinRating(e.target.value)} className="w-full" />
                  </div>
                </div>
              </div>
            </div>
            <button onClick={getRecs} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 flex-1 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">{loading ? 'Loading…' : 'Get Recommendations'}</span>
            </button>
            {error && <p className="text-red-400">{error}</p>}
          </div>
        </div>
        <div className="flex flex-1 p-6 xl:p-8">
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {results.map(m => (
              <div className="flex flex-col gap-4 rounded-lg bg-[#1c1c26] overflow-hidden group">
                <Link to={`/movie?id=${m.id}`}>
                  <img className="w-full transition-transform duration-300 group-hover:scale-105\" style={{ objectFit: 'contain', background: '#000', height: 256 }} data-alt={m.title} src={m.poster_url || (m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : '')} alt={m.title} />
                </Link>
                <div className="p-4 pt-0">
                  <Link to={`/movie?id=${m.id}`} className="text-white font-bold text-lg hover:text-primary">{m.title}</Link>
                  <div className="flex items-center gap-1 text-yellow-400">
                    <span className="material-symbols-outlined text-base">star</span>
                    <p className="text-white text-sm">{Number(m.vote_average ?? 0).toFixed(1)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
