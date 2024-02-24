import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import moviesApi from "../../utils/MoviesApi"


function Movies() {
  const [movies, setMovies] = useState([])
  const [searchError, setSearchError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleMovies, setVisibleMovies] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [savedSearchTerm, setSavedSearchTerm] = useState("")

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm")
    const storedMovies = JSON.parse(localStorage.getItem("movies"))

    if (storedMovies && storedSearchTerm) {
      setMovies(storedMovies)
      setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
      setSavedSearchTerm(storedSearchTerm)
    }

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
    setSearchError(false)
    moviesApi
      .getMovies()
      .then((data) => {
        const filteredMovies = data.filter(
          (movie) =>
            (movie.nameRU &&
              movie.nameRU.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (movie.nameEN &&
              movie.nameEN.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setMovies(filteredMovies)
        setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
        localStorage.setItem("searchTerm", searchTerm)
        localStorage.setItem("movies", JSON.stringify(filteredMovies))
        // + добавить значение короткометражек
      })
      .catch((err) => {
        setSearchError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const calculateVisibleAddition = (width) => {
    if (width >= 1280) {
      return { visible: 12, add: 3 }
    } else if (width >= 768) {
      return { visible: 8, add: 2 }
    } else if (width >= 320) {
      return { visible: 5, add: 2 }
    }
  }

  const loadMore = () => {
    const { add } = calculateVisibleAddition(window.innerWidth)
    setVisibleMovies((prev) => Math.min(prev + add, movies.length))
  }

  // if (loading) return <div>Загрузка...</div>
  // if (loading) return <Preloader />
  // if (searchError) return <div>Во время запроса произошла ошибка...</div>

  return (
    <main>
      <SearchForm
        onSearch={getAndFilterMovies}
        searchError={searchError} />
      <MoviesCardList
        movies={movies.slice(0, visibleMovies)}
        loadMore={loadMore}
        visibleMovies={visibleMovies}
        moviesLength={movies.length}
        loading={loading}

      />
    </main>
  )
}

export default Movies
