import React from 'react';
import SectionHeader from '../SectionHeader/SectionHeader';

function AboutProject(props) {
  return (
    <section className="about">
      <div className='about__container'>
      <SectionHeader title="О проекте" />
        <article className="about__details">
          <div className="about__item">
            <h3 className="about__subtitle">Дипломный проект включал 5 этапов</h3>
            <p className="about__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about__item">
            <h3 className="about__subtitle">На выполнение диплома ушло 5 недель</h3>
            <p className="about__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </article>
        <div className="about__graph">
          <div className="about__graph-item about__graph-item_left">
            <p className="about__graph-line about__graph-line_left">1 неделя</p>
            <span className="about__graph-label">Back-end</span>
          </div>
          <div className="about__graph-item about__graph-item_right">
            <p className="about__graph-line about__graph-line_right">4 недели</p>
            <span className="about__graph-label">Front-end</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
