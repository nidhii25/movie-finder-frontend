import { useEffect, useMemo, useState } from 'react'
import { api } from '../api'

import { Link } from 'react-router-dom'

export default function Genres() {
  const [genres, setGenres] = useState([])
  const [selected, setSelected] = useState(null)
  const [sort, setSort] = useState('popularity')
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    api.getGenres().then(g => {
      setGenres(g)
      if (g[0]) setSelected(g[0])
    }).catch(e => setError(e.message || 'Failed to load genres'))
  }, [])

  useEffect(() => {
    if (!selected) return
    const sortMap = {
      popularity: 'popularity.desc',
      rating: 'vote_average.desc',
      release_date: 'release_date.desc',
    }
    api.getMoviesByGenreSorted(selected.id, sortMap[sort], 20).then(setMovies).catch(e => setError(e.message || 'Failed to load movies'))
  }, [selected, sort])

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-dark">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex flex-1 justify-center">
          <div className="layout-content-container flex flex-col max-w-7xl flex-1">
            <main className="px-10 py-8">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex min-w-72 flex-col gap-3">
                  <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">Discover Movies</p>
                  <p className="text-[#9d9db8] text-base font-normal leading-normal">Filter and sort through thousands of movies to find your next favorite.</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex gap-2 p-3 flex-wrap">
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary px-4 text-white text-sm font-medium">All Genres</button>
                  {genres.slice(0,6).map(g => (
                    <button key={g.id} onClick={() => setSelected(g)} className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 text-white text-sm font-medium hover:bg-primary/80 transition-colors ${selected?.id===g.id? 'bg-primary':'bg-[#292938]'}`}>{g.name}</button>
                  ))}
                  <button className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#292938] pl-4 pr-2 text-white text-sm font-medium hover:bg-primary/80 transition-colors">
                    <span>More Genres</span>
                    <span className="material-symbols-outlined">arrow_drop_down</span>
                  </button>
                </div>
                <div className="flex max-w-[240px] flex-wrap items-end gap-4">
                  <label className="flex flex-col min-w-40 flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">Sort by</p>
                    <select value={sort} onChange={e=>setSort(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#1c1c26] focus:border-primary h-12 p-3 text-base font-normal leading-normal appearance-none bg-no-repeat bg-right" style={{backgroundImage: "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(157,157,184)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M215.39,100.34a8,8,0,0,0-11.32,0L128,176.69,51.94,100.63a8,8,0,0,0-11.32,11.32l80,80a8,8,0,0,0,11.32,0l80-80A8,8,0,0,0,215.39,100.34Z%27%3e%3c/path%3e%3c/svg%3e')"}}>
                      <option value="popularity">Popularity</option>
                      <option value="rating">Rating</option>
                      <option value="release_date">Release Date</option>
                    </select>
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 p-4">
                {movies.map(m => (
                  <div key={m.id} className="group relative flex flex-col gap-3 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105">
                    <div className="absolute inset-0 bg-cover bg-center\" data-alt={m.title} style={{backgroundImage: `url('${m.poster_url || (m.poster_path ? 'https://image.tmdb.org/t/p/w500' + m.poster_path : '')}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#000'}}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="relative flex flex-col justify-end p-4 h-64">
                      <h3 className="text-white text-lg font-bold leading-tight">{m.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="material-symbols-outlined text-yellow-400 !text-xl">star</span>
                        <p className="text-white text-sm">{Number(m.vote_average ?? 0).toFixed(1)}</p>
                        <p className="text-[#9d9db8] text-sm ml-auto">{m.release_date?.slice(0,4)}</p>
                      </div>
                    </div>
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Link to={`/movie?id=${m.id}`} className="flex items-center justify-center gap-2 rounded-full h-12 px-6 bg-primary text-white font-bold">
                      <span className="material-symbols-outlined">play_arrow</span>
                      <span>View Details</span>
                    </Link>
                  </div>
                  </div>
                ))}
              </div>
              {error && <p className="text-red-400 px-4">{error}</p>}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
