import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { api } from '../api'

export default function MovieDetail() {
  const [params] = useSearchParams()
  const id = params.get('id')
  const [movie, setMovie] = useState(null)
  const [similar, setSimilar] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    if (!id) return
    api.getMovie(id).then(m => {
      setMovie(m)
      const g = m.genres?.[0]?.id
      if (g) {
        return api.getMoviesByGenreSorted(g, 'popularity.desc', 10).then(setSimilar)
      } else {
        return api.getTrending(10).then(setSimilar)
      }
    }).catch(e => setError(e.message || 'Failed to load movie'))
  }, [id])

  const bg = useMemo(() => {
    const p = movie?.poster_url || (movie?.poster_path ? `https://image.tmdb.org/t/p/w780${movie.poster_path}` : '')
    return `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 40%), url('${p}')`
  }, [movie])

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="@container">
              <div className="@[480px]:px-4 @[480px]:py-3">
                <div className="bg-cover bg-center flex flex-col justify-end overflow-hidden @[480px]:rounded-lg min-h-[400px] md:min-h-[500px]\" data-alt={movie?.title} style={{backgroundImage: bg, backgroundSize: 'auto, contain', backgroundRepeat: 'no-repeat, no-repeat', backgroundPosition: 'center, center', backgroundColor: '#000'}}>
                  <div className="flex p-4 md:p-6 justify-between items-end">
                    <p className="text-white tracking-light text-[32px] md:text-[40px] font-bold leading-tight">{movie?.title || 'Movie'}</p>
                    <button className="flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#eab308] px-4 py-2 text-background-dark font-bold hover:bg-[#eab308]/80 transition-colors">
                      <span className="material-symbols-outlined text-lg">favorite_border</span>
                      <span>Add to Favorites</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-10 py-5">
              <h1 className="text-white tracking-light text-[32px] font-bold leading-tight pb-3 pt-6 text-left">Overview</h1>
              <p className="text-gray-300 text-base font-normal leading-relaxed pb-3 pt-1">{movie?.overview}</p>
            </div>
            <div className="px-4 md:px-10 py-5">
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-x-4 border-t border-solid border-t-[#3c3c53]">
                <div className="flex flex-col gap-1 py-4">
                  <p className="text-[#9d9db8] text-sm font-normal leading-normal">Rating</p>
                  <p className="text-white text-base font-medium leading-normal">{movie ? `${Number(movie.vote_average ?? 0).toFixed(1)}/10` : '-'}</p>
                </div>
                <div className="flex flex-col gap-1 py-4">
                  <p className="text-[#9d9db8] text-sm font-normal leading-normal">Release Date</p>
                  <p className="text-white text-base font-medium leading-normal">{movie?.release_date || '-'}</p>
                </div>
                <div className="flex flex-col gap-1 py-4">
                  <p className="text-[#9d9db8] text-sm font-normal leading-normal">Genre</p>
                  <p className="text-white text-base font-medium leading-normal">{movie?.genres?.map(g => g.name || g).join(', ')}</p>
                </div>
                <div className="flex flex-col gap-1 py-4">
                  <p className="text-[#9d9db8] text-sm font-normal leading-normal">Runtime</p>
                  <p className="text-white text-base font-medium leading-normal">{movie?.runtime ? `${Math.floor(movie.runtime/60)}h ${movie.runtime%60}m` : '-'}</p>
                </div>
              </div>
            </div>
            <div className="px-4 md:px-10 py-5">
              <h2 className="text-white tracking-light text-[28px] font-bold leading-tight pb-4 pt-6 text-left">Similar Movies</h2>
              <div className="relative">
                <div className="flex space-x-4 overflow-x-auto pb-4 -mx-4 px-4">
                  {similar.map(s => (
                    <div key={s.id} className="flex-shrink-0 w-40">
                      <a href={`/movie?id=${s.id}`}>
                        <img className="w-full rounded-lg mb-2\" style={{ objectFit: 'contain', background: '#000', height: 240 }} data-alt={s.title} src={s.poster_url || (s.poster_path ? `https://image.tmdb.org/t/p/w342${s.poster_path}` : '')} alt={s.title} />
                      </a>
                      <a href={`/movie?id=${s.id}`} className="text-white text-sm font-medium truncate hover:text-primary">{s.title}</a>
                    </div>
                  ))}
                </div>
              </div>
              {error && <p className="text-red-400 px-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
