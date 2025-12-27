import {NavLink } from 'react-router-dom';
import "./marvelInfoPage.scss";

const MarvelInfoPage = () => {
  return (
    <section className="marvel">
      <div className="marvel__hero">
        <h1 className="marvel__title">MARVEL UNIVERSE</h1>
        <p className="marvel__subtitle">
          A world of superheroes, legends, and epic stories
        </p>
      </div>

      <div className="marvel__content">
        <p>
          <span>Marvel</span> is a legendary universe of comics, movies, and TV
          series where ordinary people become heroes.
        </p>

        <p>
          Here you will meet <strong>Iron Man</strong>,
          <strong> Spider-Man</strong>, <strong>Thor</strong>,
          <strong> Captain America</strong>, and dozens of other characters
          whose destinies intertwine in one shared story.
        </p>

        <p>
          All events take place within the
          <span className="accent"> Marvel Cinematic Universe (MCU)</span>,
          where every movie is a piece of a larger puzzle.
        </p>

        <div className="marvel__features">
          <NavLink to='characters' className="feature">🛡 Characters</NavLink>
          <NavLink to='comics' className="feature">💥 Comics</NavLink>
        </div>

        <div className="marvel__quote">
          “With great power comes great responsibility”
        </div>
      </div>
    </section>
  );
};

export default MarvelInfoPage;
