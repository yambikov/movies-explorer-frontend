/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react"
import SearchForm from "../SearchForm/SearchForm"
import MoviesCardList from "../MoviesCardList/MoviesCardList"
import moviesApi from "../../utils/MoviesApi"
import MainApi from "../../utils/MainApi"

function Movies() {
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
    setIsShort(!isShort)
    localStorage.setItem("isShort", !isShort) // Обновляем состояние в localStorage при каждом изменении
  }

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

  const filterMovies = (movies, isShort) => {
    const filtered = movies.filter((movie) =>
      isShort ? movie.duration <= 40 : true
    )
    setFilteredMovies(filtered)
    setNoResultsFound(filtered.length === 0)
    setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible)
  }

  useEffect(() => {
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getAndFilterMovies = (searchTerm) => {
    setLoading(true)
    setSearchError(false)
    moviesApi
      .getMovies()
      .then((data) => {
        const filteredMovies = data.filter(
          (movie) =>
            movie.nameRU?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            movie.nameEN?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setAllMovies(filteredMovies)
        filterMovies(filteredMovies, isShort)
        localStorage.setItem("searchTerm", searchTerm)
        localStorage.setItem("movies", JSON.stringify(filteredMovies))
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
    } else {
      return { visible: 5, add: 2 }
    }
  }

  const loadMore = () => {
    const { add } = calculateVisibleAddition(window.innerWidth)
    setVisibleMovies((prev) => Math.min(prev + add, filteredMovies.length))
  }

  // const handleMovieSave = (data) => {
  //   MainApi.postMovie(data)
  //     .then((res) => {
  //       setSavedMovies([...savedMovies, res]); // Добавляем новую карточку в сохраненные
  //       console.log(`Movies.handleMovieSave savedMovies:`);
  //       console.log(savedMovies);
  //       console.log('=======================================================================');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleMovieSave = (movie) => {
    MainApi.postMovie(movie)
      .then((savedMovie) => {
        setSavedMovies([...savedMovies, savedMovie]);
      })
      .catch((err) => console.log(err));
  };

  const handleMovieDelete = (props) => {
    console.log(`Movies.handleMovieDelete movieId:`);
    console.log(savedMovies);
    console.log(props.movieId);
    console.log('=======================================================================');

    const movieToDelete = savedMovies.find((movie) => movie.movieId === props.movieId);
    console.log(movieToDelete);
    console.log(movieToDelete._id);
 
  MainApi.deleteMovie(movieToDelete)
        .then((res) => {console.log(res);})
    //       setSavedMovies(savedMovies.filter((movie) => movie._id !== movieToDelete._id));
    //     })
    //     .catch((err) => console.log(err));
    // } else {
    //   console.error("Failed to find the movie to delete or movie lacks an '_id' property");
    // }
  };
  
  


  // const handleMovieDelete = (data) => {
  //   // найти в сохраненных фильмы с таким id
  //   console.log(`Movies.handleMovieDelete data:`);
  //   console.log(data);
  //   console.log('=======================================================================');
  //   MainApi.deleteMovie(data)
  //     .then((res) => {
  //       // console.log(res)
  //       // console.log(data)
  //       const updatedSavedMovies = savedMovies.filter(
  //         (movie) => movie._id !== data._id
  //       );
  //       console.log(`updatedSavedMovies: ${updatedSavedMovies}`);
  //       setSavedMovies(updatedSavedMovies); // Удаляем карточку из сохраненных
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const handleMovieDelete = (data) => {
  //   console.log(data)
  //   MainApi.deleteMovie(data).then((res) => {
  //     console.log(res)
  //   })
  // }

  // function handleCardLike(card) {
  //   const isLiked = card.likes.some((i) => i === currentUser._id);
  //   (isLiked ? apiConfig.deleteLike(card._id) : apiConfig.putLike(card._id))
  //     .then((res) => {
  //       setCards((state) => state.map((c) => (c._id === card._id ? res : c)))
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return (
    <main>
      <SearchForm
        onSearch={getAndFilterMovies}
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

export default Movies
