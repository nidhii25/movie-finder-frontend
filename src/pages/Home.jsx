import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api'

export default function Home() {
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [topRated, setTopRated] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([
      api.getTrending(10),
      api.getMovies(15),
      api.getTopRated(15)
    ]).then(([t, p, tr]) => {
      setTrending(t)
      setPopular(p)
      setTopRated(tr)
    }).catch(e => setError(e.message || 'Failed to load'))
  }, [])

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-7xl flex-1">
            <main className="flex-grow">
              <section className="my-8">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Trending Now</h2>
                <div className="relative group">
                  <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory">
                    <div className="flex items-stretch p-4 gap-6 flex-shrink-0">
                      {trending.map(m => (
                        <div key={m.id} className="flex h-full flex-1 flex-col rounded-lg min-w-[300px] md:min-w-[400px] lg:min-w-[500px] relative snap-center group/slide">
                          <div className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg flex flex-col justify-end p-6\" data-alt={m.title} style={{backgroundImage: `url('${m.poster_url || (m.poster_path ? 'https://image.tmdb.org/t/p/w780' + m.poster_path : '')}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#000'}}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg"></div>
                            <div className="relative z-10">
                              <h3 className="text-white text-2xl lg:text-3xl font-bold">{m.title}</h3>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="material-symbols-outlined text-yellow-400">star</span>
                                <p className="text-white text-base font-medium">{Number(m.vote_average ?? 0).toFixed(1)}{m.release_date ? ` | ${m.release_date.slice(0,4)}` : ''}</p>
                              </div>
                              <Link to={`/movie?id=${m.id}`} className="mt-4 flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/80 transition-colors">
                                <span className="truncate">View Details</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
              <section className="my-8">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Popular Movies</h2>
                <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-stretch p-4 gap-6">
                    {popular.map(m => (
                      <div key={m.id} className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-40 group transform transition-transform duration-300 hover:scale-105">
                        <Link to={`/movie?id=${m.id}`} className="w-full">
                          <div className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-lg flex flex-col\" data-alt={m.title} style={{backgroundImage: `url('${m.poster_url || (m.poster_path ? 'https://image.tmdb.org/t/p/w500' + m.poster_path : '')}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#000'}}></div>
                        </Link>
                        <div>
                          <Link to={`/movie?id=${m.id}`} className="text-white text-base font-medium leading-normal hover:text-primary">{m.title}</Link>
                          <div className="flex items-center text-sm text-[#9d9db8]"><span className="material-symbols-outlined text-yellow-400 text-sm mr-1">star</span>{Number(m.vote_average ?? 0).toFixed(1)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              <section className="my-8">
                <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Top Rated Movies</h2>
                <div className="flex overflow-x-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <div className="flex items-stretch p-4 gap-6">
                    {topRated.map(m => (
                      <div key={m.id} className="flex h-full flex-1 flex-col gap-3 rounded-lg min-w-40 group transform transition-transform duration-300 hover:scale-105">
                        <Link to={`/movie?id=${m.id}`} className="w-full">
                          <div className="w-full bg-center bg-no-repeat aspect-[2/3] bg-cover rounded-lg flex flex-col\" data-alt={m.title} style={{backgroundImage: `url('${m.poster_url || (m.poster_path ? 'https://image.tmdb.org/t/p/w500' + m.poster_path : '')}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundColor: '#000'}}></div>
                        </Link>
                        <div>
                          <Link to={`/movie?id=${m.id}`} className="text-white text-base font-medium leading-normal hover:text-primary">{m.title}</Link>
                          <div className="flex items-center text-sm text-[#9d9db8]"><span className="material-symbols-outlined text-yellow-400 text-sm mr-1">star</span>{Number(m.vote_average ?? 0).toFixed(1)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
              {error && <p className="text-red-400 px-4">{error}</p>}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
