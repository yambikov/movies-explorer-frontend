// import logo from './logo.svg';
import './App.css';
// import React, { useState } from "react"
import { CurrentUserContext } from "../../context/CurrentUserContext"
import { Routes } from 'react-router-dom';
import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
// import Footer from "../Footer";
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
              <Promo />
              <NavTab />
              <AboutProject />
              <Techs />
              {/*
               — компонент с использованными технологиями.
              AboutMe — компонент с информацией о студенте.
              Portfolio 
              
              <Footer /> */}
            </>}
          />
        </ Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
