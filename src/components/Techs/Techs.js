import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

function Techs(props) {
  return (
    <section className="techs">
      <div className='techs__container'>
        <SectionHeader title="Технологии" />
        <article className="techs__details">
          <h3 className='techs__subtitle'>7 технологий</h3>
          <p className='techs__text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          <ul className='techs__list'>
            <li className='techs__item'>HTML</li>
            <li className='techs__item'>CSS</li>
            <li className='techs__item'>JS</li>
            <li className='techs__item'>React</li>
            <li className='techs__item'>Git</li>
            <li className='techs__item'>Express.js</li>
            <li className='techs__item'>mondoDB</li>
          </ul>
        </article>

      </div>
    </section>
  );
}

export default Techs;
