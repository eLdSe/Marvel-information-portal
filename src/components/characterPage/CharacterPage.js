import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import MarvelService from "../../services/MarvelService";

import "./characterPage.scss";

const marvelService = new MarvelService();
const CharacterPage = () => {
    const { id } = useParams();
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);


    useEffect(() => {
        setLoading(true);
        marvelService
            .getCharacter(id)
            .then(setChar)
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="char-page__loading">Loading...</div>;
    if (error || !char) return <div className="char-page__error">Character not found</div>;

    return (
        <div className="char-page">
            <Helmet>
                <meta
                    name="description"
                    content={`${char.name} information page`}
                />
                <title>{char.name}</title>
            </Helmet>
            <div className="char-page__wrapper">
                <img
                    src={char.thumbnail}
                    alt={char.name}
                    className="char-page__img"
                />

                <div className="char-page__info">
                    <h1 className="char-page__name">{char.name}</h1>

                    <p className="char-page__descr">
                        {char.description}
                    </p>

                    <div className="char-page__links">
                        <a href={char.homepage} target="_blank" rel="noreferrer">
                            Homepage
                        </a>
                        <a href={char.wiki} target="_blank" rel="noreferrer">
                            Wiki
                        </a>
                    </div>
                </div>
            </div>

            <h2 className="char-page__comics-title">Comics:</h2>
            <ul className="char-page__comics-list">
                {char.comics.length > 0 ? (
                    char.comics.map((item, i) => (
                        <li key={i} className="char-page__comic">
                            {item.name || item}
                        </li>
                    ))
                ) : (
                    <li>No comics info available</li>
                )}
            </ul>
        </div>
    );
};

export default CharacterPage;
