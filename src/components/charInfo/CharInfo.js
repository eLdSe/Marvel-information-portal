import { useEffect, useState } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spiner/Spiner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import "./charInfo.scss";


const marvelService = new MarvelService();
const CharInfo = ({ selectedChar }) => {

  const [char, setChar] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [error, setError] = useState(false)


  useEffect(() => {
    updateChar()
  }, [])

  useEffect(() => {
    updateChar()
  }, [selectedChar])


  const updateChar = () => {
    if (!selectedChar) return;
    onCharLoading();
    marvelService
      .getCharacter(selectedChar)
      .then(onCharLoad)
      .catch(onError);
  };

  const onCharLoad = (char) => {
    setChar(char)
    setLoading(false)
  };

  const onError = () => {
    setLoading(false)
    setError(true)
  };

  const onCharLoading = () => {
    setLoading(true)
  };


  const skeleton = char || Loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = Loading ? <Spinner /> : null;
  const content = !(Loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
}

const View = ({ char }) => {
  const { name, description, homepage, wiki, thumbnail, comics } = char;
  let imgStyle = { objectFit: "cover" };
  if (
    thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
  ) {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt="name" style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} target='_blank' rel="noopener noreferrer" className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} target='_blank' rel="noopener noreferrer" className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.map((item, i) => {
          return (
            <li key={i} className="char__comics-item">
              {item}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CharInfo;
