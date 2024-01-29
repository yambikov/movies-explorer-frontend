// import logo from './logo.svg';
import './App.css';
// import React, { useState } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Routes } from 'react-router-dom';
import Hero from "../Hero/Hero";
import Header from "../Header/Header";
import Footer from "../Footer";
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
              <Hero />
              <Footer />
            </>}
          />
        </ Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
