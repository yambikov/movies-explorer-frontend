import "./App.css"
import {CurrentUserContext} from "../../context/CurrentUserContext"
import {Routes} from "react-router-dom"
import Header from "../Header/Header"
import {Route} from "react-router"
import Footer from "../Footer/Footer"
import Main from "../Main/Main"
import Movies from "../Movies/Movies"
import Login from "../Login/Login"
import Register from "../Register/Register"
import Profile from "../Profile/Profile"
import PageNotFound from "../PageNotFound/PageNotFound"
// import Preloader from '../Preloader/Preloader';
import SavedMovies from "../SavedMovies/SavedMovies"
import MainApi from "../../utils/MainApi"
import {useNavigate} from "react-router-dom"
import {useEffect, useState} from "react"
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    setIsLoading(true); // Устанавливаем перед началом операции
    handleTokenCheck()
      .finally(() => {
        setIsLoading(false); // Очистка после завершения операции
      });
  }, []);
  

  useEffect(() => {
    if (loggedIn) {
      // apiConfig.getInitialCards()
      //   .then((res) => {
      //     setCards(res);
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });

      MainApi.getUserInfoApi()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [loggedIn])

  function onRegister(name, email, password) {
    return MainApi.register({name, email, password})
      .then((res) => {
        return onLogin(email, password);
        // setIsInfoTooltipOpen(true)
        // setIsInfoTooltipSuccessed(true)
      })
      .catch((err) => {
        console.log(err)
        throw err
        // setIsInfoTooltipOpen(true)
        // setIsInfoTooltipSuccessed(false)
      })
  }

  // Что происходит при логИне
  function onLogin(email, password) {
    return MainApi.login({email, password})
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token)
          setLoggedIn(true)
          navigate("/movies", {replace: true})
        }
      })
      .catch((err) => {
        console.log(err)
        throw err
      })
  }

  // Проверка валидности токена
  function handleTokenCheck() {
    const token = localStorage.getItem("jwt");
    if (token) {
      return MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    } else {
      return Promise.resolve(); // Добавлено для явного возвращения промиса
    }
  }

  /*
    function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      return MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(res);
          }
        })
        .catch((err) => console.log(err));
    } else {
      // Возвращаем промис, который немедленно разрешается, если токен отсутствует
      return Promise.resolve();
    }
  }
  */

  function handleUpdateUser(name, email) {
    return MainApi.patchUserInfo({name, email})
      .then((res) => {
        setCurrentUser(res)
        return res
      })
      .catch((err) => {
        throw err
      })
  }

  function handleLogout() {
    setLoggedIn(false)
    localStorage.clear()
    navigate("/")
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />

        <Route
          path="/"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={<ProtectedRoute loggedIn={loggedIn} isLoading={isLoading} />}
        >
          <Route
            path=""
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Movies />
                <Footer />
              </>
            }
          />
        </Route>
        <Route
          path="/saved-movies"
          element={<ProtectedRoute loggedIn={loggedIn} isLoading={isLoading} />}
        >
          <Route
            path=""
            element={
              <>
                <Header loggedIn={loggedIn} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
        </Route>
        <Route
          path="/profile"
          element={<ProtectedRoute loggedIn={loggedIn} isLoading={isLoading} />}
        >
          <Route
            path=""
            element={
              <>
                <Header loggedIn={loggedIn} />
                <Profile
                  handleLogout={handleLogout}
                  handleUpdateUser={handleUpdateUser}
                />
              </>
            }
          />
        </Route>
      </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
