import './App.css';
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Routes } from 'react-router-dom';
import Header from "../Header/Header";
import { Route } from "react-router";
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import PageNotFound from '../PageNotFound/PageNotFound';
// import Preloader from '../Preloader/Preloader';
import SavedMovies from '../SavedMovies/SavedMovies';


function App() {
  return (
    <CurrentUserContext.Provider>
      {/* <div className="root brd"> */}
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/signin" element={<Login />} />
          {/* <Route path="/signup" element={<Login onLogin={onLogin} />} /> */}
          {/* <Route path="/signin" element={<Register onRegister={onRegister} />}/> */}
          <Route path="/signup" element={<Register />} />
          <Route path='/profile' element={
            <>
              <Header />
              <Profile />

            </>

          } />
          <Route path="/" element={
            <>
              <Header />
              <Main />
              <Footer />
            </>
          }
          />
          <Route path="/movies" element={
            <>
              <Header />
              <Movies />
              <Footer />
            </>
          } />
          <Route path="/saved-movies" element={
            <>
              {/* <Preloader /> */}
              <Header />
              <SavedMovies />
              <Footer />
            </>
          } />
        </Routes>
      {/* </div> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
