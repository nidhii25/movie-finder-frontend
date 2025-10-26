import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { api } from '../api'

export default function SearchResults() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q') || ''
  const [term, setTerm] = useState(q)
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setTerm(q) }, [q])

  useEffect(() => {
    if (!q) { setResults([]); return }
    setLoading(true)
    setError('')
    api.searchMovies(q, 24)
      .then(setResults)
      .catch(e => setError(e.message || 'Search failed'))
      .finally(() => setLoading(false))
  }, [q])

  const submit = (e) => {
    e.preventDefault()
    const v = term.trim()
    if (v) navigate(`/search?q=${encodeURIComponent(v)}`)
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="px-4 py-3">
              <form onSubmit={submit} className="flex items-center gap-2">
                <input value={term} onChange={e=>setTerm(e.target.value)} className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border border-[#3c3c53] bg-[#141414] focus:border-primary h-12 px-4 text-base font-normal leading-normal" placeholder="Search for movies…" />
                <button className="flex h-12 shrink-0 items-center justify-center rounded-lg bg-primary px-4 text-white font-bold">Search</button>
              </form>
            </div>
            {q ? <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Search Results for '{q}'</h2> : <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Search</h2>}
            {loading && <p className="px-4 text-white">Loading…</p>}
            {!loading && q && results.length === 0 && !error && (
              <p className="px-4 text-white">No results found.</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 px-4 py-5">
              {results.map(r => (
                <div key={r.id} className="flex flex-col gap-2 group cursor-pointer">
                  <Link to={`/movie?id=${r.id}`} className="relative rounded-lg overflow-hidden transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-primary/30">
                    <img className="w-full h-auto\" style={{ objectFit: 'contain', background: '#000' }} data-alt={r.title} src={r.poster_url || (r.poster_path ? `https://image.tmdb.org/t/p/w342${r.poster_path}` : '')} alt={r.title} />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </Link>
                  <Link to={`/movie?id=${r.id}`} className="text-white font-bold text-base hover:text-primary">{r.title}</Link>
                  <div className="flex items-center gap-1 text-sm text-yellow-400">
                    <span className="material-symbols-outlined !text-base" style={{fontVariationSettings: `'FILL' 1`}}>star</span>
                    <span>{Number(r.vote_average ?? 0).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>
            {error && <p className="text-red-400 px-4">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
