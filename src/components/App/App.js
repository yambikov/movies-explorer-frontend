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
import * as auth from "../../utils/Auth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function App() {
  const navigate = useNavigate()

    // Проверка залогинен ли пользователь при загрузке страницы
    useEffect(() => {
      handleTokenCheck();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  function onRegister(name, email, password) {
    auth
      .register(name, email, password)
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
  };

  // Что происходит при логИне
  function onLogin(password, email) {
    auth
      .login(password, email)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token)
          // setLoggedIn(true)
          // setEmail(email)
          navigate("/", { replace: true })
        }
      })
      .catch((err) => console.log(err))
  };

  // Проверка валидности токена
  function handleTokenCheck() {
    if (localStorage.getItem("jwt")) {
      const token = localStorage.getItem("jwt");
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            console.log("token is valid");;
            // setLoggedIn(true);
            // setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }




  return (
    <CurrentUserContext.Provider>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />
        <Route
          path="/profile"
          element={
            <>
              <Header />
              <Profile />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <>
              <Header />
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
              <Header />
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
