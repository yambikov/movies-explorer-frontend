
import Promo from "../Promo/Promo";
import NavTab from '../NavTab/NavTab';
import Techs from '../Techs/Techs';
import AboutProject from '../AboutProject/AboutProject';
import AboutMe from '../AboutMe/AboutMe';
import { useRef } from "react";


function Main() {
  const aboutRef = useRef(null);
  const techsRef = useRef(null);
  const aboutMeRef = useRef(null);

  return (
    <main>
      <Promo />
      <NavTab aboutRef={aboutRef} techsRef={techsRef} aboutMeRef={aboutMeRef} />
      <AboutProject ref={aboutRef} />
      <Techs ref={techsRef} />
      <AboutMe ref={aboutMeRef} />
    </main>

  );
}

export default Main;
