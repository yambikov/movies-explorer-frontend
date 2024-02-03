import './App.css';
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Routes } from 'react-router-dom';
import Header from "../Header/Header";
import { Route } from "react-router";
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';


function App() {
  return (
    <CurrentUserContext.Provider>
      <div className="root brd">
        <Routes>
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
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
