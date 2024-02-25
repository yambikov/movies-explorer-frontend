/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
// import moviesApi from "../../utils/MoviesApi"
import MainApi from "../../utils/MainApi"

function SavedMovies() {
  const [allMovies, setAllMovies] = useState([]) // Исходный список всех фильмов
  const [filteredMovies, setFilteredMovies] = useState([]) // Отфильтрованные фильмы
  const [searchError, setSearchError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleMovies, setVisibleMovies] = useState([])
  const [isShort, setIsShort] = useState(
    JSON.parse(localStorage.getItem("isShort")) || false
  )
  const [noResultsFound, setNoResultsFound] = useState(false)

  const [savedMovies, setSavedMovies] = useState([]);

  const toggleShortFilter = () => {
    setIsShort(!isShort);
    localStorage.setItem("isShort", JSON.stringify(!isShort));
    setFilteredMovies(filterMovies(savedMovies, ""));
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm")
    const storedMovies = JSON.parse(localStorage.getItem("movies"))

    if (storedMovies && storedSearchTerm) {
      setAllMovies(storedMovies)
      filterMovies(storedMovies, isShort) // Используем isShort напрямую
      setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
    }

    const handleResize = () => {
      clearTimeout(window.resizeDebounce)
      window.resizeDebounce = setTimeout(() => {
        setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
      }, 100)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [isShort]) // Добавляем isShort в список зависимостей

  useEffect(() => {
    filterMovies(allMovies, isShort) // Перефильтровываем фильмы при изменении isShort
  }, [allMovies, isShort])


  useEffect(() => {
    setFilteredMovies(filterMovies(savedMovies, ""));
  }, [isShort, savedMovies]);

  const filterMovies = (movies, searchTerm = "") => {
    // Проверяем, что searchTerm является строкой
    const searchQuery = typeof searchTerm === "string" ? searchTerm.toLowerCase() : "";
  
    return movies.filter((movie) =>
      (movie.nameRU.toLowerCase().includes(searchQuery) || movie.nameEN.toLowerCase().includes(searchQuery)) &&
      (!isShort || movie.duration <= 40)
    );
  };

  useEffect(() => {
    setLoading(true);
    MainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        setFilteredMovies(filterMovies(movies, ""));
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);


  const calculateVisibleAddition = (width) => {
    if (width >= 1280) {
      return { visible: 12, add: 3 }
    } else if (width >= 768) {
      return { visible: 8, add: 2 }
    } else {
      return { visible: 5, add: 2 }
    }
  }

  const loadMore = () => {
    const { add } = calculateVisibleAddition(window.innerWidth)
    setVisibleMovies((prev) => Math.min(prev + add, filteredMovies.length))
  }

  const handleSearch = (searchTerm) => {
    setSearchError(false);
    try {
      const result = filterMovies(savedMovies, searchTerm);
      setFilteredMovies(result);
      setNoResultsFound(result.length === 0);
    } catch (error) {
      setSearchError(true);
    }
  };

  const handleMovieSave = (movie) => {
    MainApi.postMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
      })
      .catch((err) => console.log(err));
  };

  const handleMovieDelete = (props) => {
    const movieToDelete = savedMovies.find((movie) => movie.movieId === props.movieId);
  
    if (movieToDelete) {
      MainApi.deleteMovie(movieToDelete)
        .then(() => {
          console.log(savedMovies);
          const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieToDelete._id);
          setSavedMovies(updatedSavedMovies);
          console.log(savedMovies);

        })
        .catch((err) => console.log(err));
    } else {
      console.error("Не найден фильм для удаления");
    }
  };


  return (
    <main>
      <SearchForm
        // onSearch={getAndFilterMovies}
        onSearch={handleSearch} 
        searchError={searchError}
        toggleShortFilter={toggleShortFilter}
      />
      <MoviesCardList
        movies={filteredMovies.slice(0, visibleMovies)}
        loadMore={loadMore}
        visibleMovies={visibleMovies}
        moviesLength={filteredMovies.length}
        loading={loading}
        noResultsFound={noResultsFound}
        onMovieSave={handleMovieSave}
        onMovieDelete={handleMovieDelete}

        savedMovies={savedMovies}
      // _id={savedMoviesId}
      />
    </main>
  )
}

export default SavedMovies
