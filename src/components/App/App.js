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

function App() {
  const navigate = useNavigate()

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
