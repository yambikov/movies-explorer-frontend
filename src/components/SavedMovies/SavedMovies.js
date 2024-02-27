/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MainApi from "../../utils/MainApi";

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [visibleMovies, setVisibleMovies] = useState(0);
  // const [isShort, setIsShort] = useState(JSON.parse(localStorage.getItem("isShort")) || false);
  const [isShort, setIsShort] = useState(false);
  const [noResultsFound, setNoResultsFound] = useState(false);
  const cardsFromSavedMovies = true

  useEffect(() => {
    setLoading(true);
    MainApi.getSavedMovies()
      .then((movies) => {
        setSavedMovies(movies);
        filterAndSetMovies(movies, "");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleShortFilter = () => {
    const newIsShort = !isShort;
    setIsShort(newIsShort);
    // localStorage.setItem("isShort", JSON.stringify(newIsShort));
    filterAndSetMovies(savedMovies, "");
  };

  useEffect(() => {
    filterAndSetMovies(savedMovies, "");
  }, [isShort, savedMovies]);

  const filterMovies = (movies, searchTerm = "") => {
    const searchQuery = searchTerm.toLowerCase();
    return movies.filter(movie =>
      (movie.nameRU.toLowerCase().includes(searchQuery) || movie.nameEN.toLowerCase().includes(searchQuery)) &&
      (!isShort || movie.duration <= 40)
    );
  };

  const filterAndSetMovies = (movies, searchTerm) => {
    const filtered = filterMovies(movies, searchTerm);
    setFilteredMovies(filtered);
    setNoResultsFound(filtered.length === 0);
    setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible);
  };

  const calculateVisibleAddition = (width) => {
    if (width >= 1280) {
      return { visible: 12, add: 3 };
    } else if (width >= 768) {
      return { visible: 8, add: 2 };
    } else {
      return { visible: 5, add: 2 };
    }
  };

  useEffect(() => {
    const updateVisibleMovies = () => {
      setVisibleMovies(calculateVisibleAddition(window.innerWidth).visible);
    };

    window.addEventListener("resize", updateVisibleMovies);
    return () => window.removeEventListener("resize", updateVisibleMovies);
  }, []);

  const loadMore = () => {
    const { add } = calculateVisibleAddition(window.innerWidth);
    setVisibleMovies(prev => Math.min(prev + add, filteredMovies.length));
  };

  const handleSearch = (searchTerm) => {
    setSearchError(false);
    try {
      filterAndSetMovies(savedMovies, searchTerm);
    } catch (error) {
      setSearchError(true);
      console.error("Search error:", error);
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
    const movieToDelete = savedMovies.find((movie) => movie.movieId === props);
    if (movieToDelete) {
      MainApi.deleteMovie(movieToDelete)
        .then(() => {
          // console.log(savedMovies);
          const updatedSavedMovies = savedMovies.filter((movie) => movie._id !== movieToDelete._id);
          setSavedMovies(updatedSavedMovies);
          // console.log(savedMovies);

        })
        .catch((err) => console.log(err));
    } else {
      console.error("Не найден фильм для удаления");
    }
  };




// console.log(filteredMovies);
  return (
    <main>
      <SearchForm
        // onSearch={getAndFilterMovies}
        onSearch={handleSearch} 
        searchError={searchError}
        toggleShortFilter={toggleShortFilter}
        cardsFromSavedMovies={cardsFromSavedMovies}
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
        cardsFromSavedMovies={cardsFromSavedMovies}
      // _id={savedMoviesId}
      />
    </main>
  )
}

export default SavedMovies
