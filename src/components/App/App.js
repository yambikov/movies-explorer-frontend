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
import AboutMe from '../AboutMe/AboutMe';
import Footer from '../Footer/Footer';
import { useRef } from "react";



// State для хранения данных о текущем пользователе
// const [currentUser, setCurrentUser] = useState({})




function App() {
  const aboutRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  return (
    <CurrentUserContext.Provider>
      <div className="root brd">
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Promo />
              <NavTab aboutRef={aboutRef} techsRef={techsRef} aboutMeRef={aboutMeRef} />
              <div ref={aboutRef}><AboutProject /></div>
              <div ref={techsRef}><Techs /></div>
              <div ref={aboutMeRef}><AboutMe /></div>
              <Footer />
            </>}
          />
          <Route path="/movies" element={<Techs />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
