import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Genres from './pages/Genres'
import MovieDetail from './pages/MovieDetail'
import Recommendations from './pages/Recommendations'
import SearchResults from './pages/SearchResults'
import About from './pages/About'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/movie" element={<MovieDetail />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  )
}

export default App
