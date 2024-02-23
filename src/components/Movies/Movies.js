import React, {useState, useEffect} from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import moviesApi from "../../utils/MoviesApi"

function Movies() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleMovies, setVisibleMovies] = useState([])

  useEffect(() => {
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleResize = () => {
    clearTimeout(window.resizeDebounce)
    window.resizeDebounce = setTimeout(() => {
      setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
    }, 100)
  }

  const getAndFilterMovies = (searchTerm) => {
    setLoading(true)
    setError(false)
    moviesApi
      .getMovies()
      .then((data) => {
        const filteredMovies = data.filter((movie) =>
          movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setMovies(filteredMovies)
        setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
        
      })
      .catch((err) => {
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const calculateVisibleAddition = (width) => {
    if (width >= 1280) {
      return {visible: 12, add: 3}
    } else if (width >= 768) {
      return {visible: 8, add: 2}
    } else if (width >= 320) {
      return {visible: 5, add: 2}
    }
  }

  const loadMore = () => {
    const {add} = calculateVisibleAddition(window.innerWidth)
    setVisibleMovies((prev) => Math.min(prev + add, movies.length))
  }

  if (loading) return <div>Загрузка...</div>
  if (error) return <div>Во время запроса произошла ошибка...</div>
  // if (movies.length === 0) return <div>Ничего не найдено</div>;

  return (
    <main>
      <SearchForm onSearch={getAndFilterMovies} />
      <MoviesCardList
        movies={movies.slice(0, visibleMovies)}
        loadMore={loadMore}
        visibleMovies={visibleMovies}
        moviesLength={movies.length}
      />
    </main>
  )
}

export default Movies
