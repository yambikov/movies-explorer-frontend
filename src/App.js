// import logo from './logo.svg';
import './App.css';
// import React, { useState } from "react"
import { CurrentUserContext } from "../src/context/CurrentUserContext"
import { Routes } from 'react-router-dom';
import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route } from "react-router";


// State для хранения данных о текущем пользователе
// const [currentUser, setCurrentUser] = useState({})

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
            </>}
          />
        </ Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
