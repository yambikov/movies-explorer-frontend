import "./App.css"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Routes } from "react-router-dom"
import Header from "../Header/Header"
import { Route } from "react-router"
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
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  // const [userName, setUserName] = useState("");
  // const [email, setEmail] = useState("")
  const [currentUser, setCurrentUser] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    handleTokenCheck()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    MainApi.register(name, email, password)
      .then((res) => {
        navigate("/signin", { replace: true })
        // setIsInfoTooltipOpen(true)
        // setIsInfoTooltipSuccessed(true)
      })
      .catch((err) => {
        console.log(err)
        // setIsInfoTooltipOpen(true)
        // setIsInfoTooltipSuccessed(false)
      })
  }

  // Что происходит при логИне
  function onLogin(password, email) {
    MainApi.login(password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token)
          setLoggedIn(true)
          // setEmail(email)
          navigate("/", { replace: true })
        }
      })
      .catch((err) => console.log(err))
  }

  // Проверка валидности токена
  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt")
      MainApi.checkToken(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true)
            // setUserName(res.name);
            setCurrentUser(res)
            // setEmail(res.email)
            navigate("/", { replace: true })
          }
        })
        .catch((err) => console.log(err))
    }
  }

  function handleUpdateUser(name, email) {
   return MainApi.patchUserInfo({ name, email })
      .then((res) => {
        setCurrentUser(res);
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />
        <Route
          path="/profile"
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Profile handleUpdateUser={handleUpdateUser} />
            </>
          }
        />
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
          element={
            <>
              <Header loggedIn={loggedIn} />
              <Movies />
              <Footer />
            </>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <>
              {/* <Preloader /> */}
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </>
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  )
}

export default App
