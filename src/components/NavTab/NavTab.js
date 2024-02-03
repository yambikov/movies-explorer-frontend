import React from "react";

function NavTab({ aboutRef, techsRef, aboutMeRef }) {
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="navtab">
      <nav className="navtab__navigation">
        <ul className="navtab__navigation-list">
          <li className="navtab__navigation-item link" onClick={() => scrollToRef(aboutRef)}>О проекте</li>
          <li className="navtab__navigation-item link" onClick={() => scrollToRef(techsRef)}>Технологии</li>
          <li className="navtab__navigation-item link" onClick={() => scrollToRef(aboutMeRef)}>Студент</li>
        </ul>
      </nav>
    </section>
  );
}

export default NavTab;
